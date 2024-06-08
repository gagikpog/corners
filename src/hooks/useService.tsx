import { useCallback, useEffect, useRef, useState } from 'react';
import { IRequest, ISettings, ResponseActions, ServiceEvents } from '../types';
import { Service } from '../helpers/service';
import { getPeerIdFromUrl } from '../helpers/url';

export function useService() {
    const [peerId, setPeerId] = useState<string>('');
    const [connected, setConnected] = useState<boolean>(false);
    const [settings, updateSettings] = useState<ISettings>({ itemsWidth: 4, itemsHight: 3 });

    const service = useRef(new Service());

    useEffect(() => {
        service.current.subscribe(ServiceEvents.Open, (peerId: string) => {
            setPeerId(peerId);
            const peerIdFromUrl = getPeerIdFromUrl();

            if (peerIdFromUrl) {
                service.current.connectTo(peerIdFromUrl, true);
            }
        });

        service.current.subscribe<boolean>(ServiceEvents.Connection ,(connected: boolean) => {
            setConnected(connected);
        });

    }, []);

    const sendMove = useCallback((payload: object) => {
        service.current.send({
            needResult: false,
            callId: '',
            data: {
                action: ResponseActions.Play,
                payload
            }
        });
    }, []);

    const setSettings = useCallback((settings: ISettings) => {
        updateSettings(settings);
        service.current.send({
            needResult: false,
            callId: '',
            data: {
                action: ResponseActions.SyncSettings,
                payload: settings
            }
        });
    }, []);

    useEffect(() => {
        service.current.subscribe<IRequest>(ServiceEvents.Data, (data) => {
            switch (data.data.action) {
                case ResponseActions.SyncSettings:
                    const payload = data.data.payload as ISettings;
                    updateSettings(payload);
                    break;
            }
        });
    });

    const connectTo = useCallback((peerId: string) => {
        service.current.connectTo(peerId, false);
    }, []);

    return { sendMove, setSettings, connectTo, settings, peerId, connected, service: service.current };

}
