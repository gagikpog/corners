import { useCallback, useEffect, useState } from 'react';
import { IRequest, ISettings, ResponseActions, ServiceEvents } from '../types';
import { Service } from '../helpers/service';
import { getPeerIdFromUrl } from '../helpers/url';

export function useService() {
    const [peerId, setPeerId] = useState<string>('');
    const [connected, setConnected] = useState<boolean>(false);
    const [settings, updateSettings] = useState<ISettings>({ itemsWidth: 4, itemsHeight: 3 });

    const [service] = useState(() => new Service());

    const sendMove = useCallback((payload: object) => {
        service.send({
            needResult: false,
            callId: '',
            data: {
                action: ResponseActions.Play,
                payload
            }
        });
    }, [service]);

    const sendNewGame = useCallback(() => {
        service.send({
            needResult: false,
            callId: '',
            data: {
                action: ResponseActions.NewGame,
                payload: null
            }
        });
    }, [service]);

    const setSettings = useCallback((settings: ISettings) => {
        updateSettings(settings);
        service.send({
            needResult: false,
            callId: '',
            data: {
                action: ResponseActions.SyncSettings,
                payload: settings
            }
        });
    }, [service]);

    const connectTo = useCallback((peerId: string) => {
        service.connectTo(peerId, false);
    }, [service]);


    useEffect(() => {
        const subscribers = [
            service.subscribe(ServiceEvents.Open, (peerId: string) => {
                setPeerId(peerId);
                const peerIdFromUrl = getPeerIdFromUrl();
    
                if (peerIdFromUrl) {
                    service.connectTo(peerIdFromUrl, true);
                }
            }),
            service.subscribe<boolean>(ServiceEvents.Connection ,(connected: boolean) => {
                setConnected(connected);
            }),
            service.subscribe<IRequest>(ServiceEvents.Data, (data) => {
                switch (data.data.action) {
                    case ResponseActions.SyncSettings:
                        const payload = data.data.payload as ISettings;
                        updateSettings(payload);
                        break;
                }
            })
        ];

        return () => subscribers.forEach((func) => func());
    }, [service]);

    return { sendMove, sendNewGame, setSettings, connectTo, settings, peerId, connected, service };
}
