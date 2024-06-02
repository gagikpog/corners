import { useCallback, useEffect, useRef, useState } from 'react';
import { ResponseActions, ServiceEvents } from '../types';
import { Service } from '../helpers/service';
import { getPeerIdFromUrl } from '../helpers/url';

export function useService() {
    const [peerId, setPeerId] = useState<string>('');
    const [connected, setConnected] = useState<boolean>(false);

    const service = useRef(new Service());

    useEffect(() => {
        service.current.subscribe(ServiceEvents.Open, (peerId: string) => {
            setPeerId(peerId);
            console.log('peerId', peerId);
            const peerIdFromUrl = getPeerIdFromUrl()

            if (peerIdFromUrl) {
                service.current.connectTo(peerIdFromUrl, false);
            }
        });

        service.current.subscribe<boolean>(ServiceEvents.Connection ,(connected: boolean) => {
            setConnected(connected);
            console.log('connected', connected);
        });

        service.current.subscribe<object>(ServiceEvents.Data ,(data) => {
            console.log('data', data);
        });

    }, []);

    const send = useCallback((payload: object) => {
        service.current.send({
            needResult: false,
            callId: '',
            data: {
                action: ResponseActions.Play,
                payload
            }
        });
    }, []);

    const connectTo = useCallback((peerId: string) => {
        service.current.connectTo(peerId, false);
    }, []);

    return { send, connectTo, peerId, connected };

}
