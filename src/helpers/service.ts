import { DataConnection, Peer } from 'peerjs';
import { IRequest, ResponseActions, ServiceEvents } from '../types';

type Subscriber = {[key: string]: (data: unknown) => void};

interface ISubscribers {
    [ServiceEvents.Connection]: Subscriber;
    [ServiceEvents.Data]: Subscriber;
    [ServiceEvents.Open]: Subscriber;
}

export class Service {
    private _pickId: string = '';
    private _extPickId: string = '';
    private _peer: Peer;
    private _conn: DataConnection = null as unknown as DataConnection;
    private _connectionOpened: boolean = false;
    private _timeout: number = 5000;
    private _queue: {[key: string]: { resolve: (res?: IRequest) => void, reject: (error?: Error) => void, timerIndex: number }} = {};
    private _subscribers: ISubscribers = {
        [ServiceEvents.Connection]: {},
        [ServiceEvents.Data]: {},
        [ServiceEvents.Open]: {}
    };

    constructor() {
        this._peer = new Peer('', {});

        this._peer.on('open', (peerId: string) => {
            this._pickId = peerId;
            this._notify(ServiceEvents.Open, peerId);
        });

        this._peer.on('connection', (conn) => {
            conn.on('data', (str: unknown): void => {
                try {
                    if (typeof str === 'string') {
                        const response = JSON.parse(str) as IRequest;
                        this._resolve(response.callId, response);
                    }
                } catch (error) {
                    console.error(error);
                }
            });
        });

        this._peer.on('close', () => {
            this._connectionOpened = false;
            this._notify(ServiceEvents.Connection, false);
        });
    }

    connectTo(anotherPeersId: string, withNotify: boolean = true): void {
        this._extPickId = anotherPeersId;
        this._conn = this._peer.connect(anotherPeersId);
        this._conn.on('open', () => {
            this._connectionOpened = true;
            this._notify(ServiceEvents.Connection, true);

            if (withNotify) {
                this.send({
                    needResult: false,
                    callId: '',
                    data: {
                        action: ResponseActions.Connect,
                        payload: {
                            pickId: this._pickId
                        }
                    }
                });
            }
        });
    }

    async send(response: IRequest): Promise<IRequest|void> {
        if (this._connectionOpened) {
            response.callId = response.callId || `${this._pickId}-coll-id-${Math.random()}`

            this._conn.send(JSON.stringify(response));

            return new Promise((resolve, reject) => {

                const timerIndex = response.needResult ? setTimeout(() => {
                    this._resolve(response.callId, new Error('Timeout error'));
                }, this._timeout) : null;

                this._queue[response.callId] = {
                    resolve,
                    reject,
                    timerIndex: Number(timerIndex)
                };
            });
        }
    }

    private _resolve(callId: string, data: IRequest | Error): void {

        if (!(data instanceof Error)) {
            if (data.data.action === ResponseActions.Connect) {
                const payload = data.data.payload as { pickId: string };
                this.connectTo(payload.pickId, false);
                this._extPickId = payload.pickId;
                return;
            }
        }

        const queue = this._queue[callId];
        if (queue) {
            if (data instanceof Error) {
                queue.reject(data);
            } else {
                queue.resolve(data);
            }
            delete this._queue[callId];
            clearTimeout(queue.timerIndex);
        } else {
            if (!(data instanceof Error)) {
                this._notify(ServiceEvents.Data, data);
            }
        }
    }

    private _notify(eventName: ServiceEvents, data: unknown): void {
        Object.keys(this._subscribers[eventName]).forEach((key) => {
            const func = this._subscribers[eventName][key];
            if (typeof func === 'function') {
                func(data);
            }
        });
    }

    subscribe<T>(eventName: ServiceEvents, callback: (data: T) => void): () => void {
        const key = `subscriber-${Math.random()}`;
        this._subscribers[eventName][key] = callback as (data: unknown) => void;
        return () => {
            delete this._subscribers[eventName][key];
        };
    }

    getPeerIds() {
        return {
            peerId: this._pickId,
            extPickId: this._extPickId
        };
    }
}
