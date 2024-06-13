import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../context';
import { IFrameMessage, ILastMove } from '../types';
import { UrlInputDialog } from './urlInputDialog';

export function Bot() {
    const frameRef = useRef<HTMLIFrameElement>(null);
    const { activePlayer, numberOfMoves, figures, connected, botUrl, setBotUrl, showMessage, moveSelected } = useContext(Context);
    const [inputOpened, setInputOpened] = useState(false);

    const onMessage = useCallback((event: MessageEvent<IFrameMessage>) => {
        switch (event.data.action) {
            case 'step':
                moveSelected(event.data.payload as ILastMove);
                break;
        }
    }, [moveSelected]);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.code === 'KeyB' && event.ctrlKey) {
            setInputOpened(true);
        }
    }, []);

    const onInput = useCallback((url: string) => {
        if (url) {
            setInputOpened(false);
            setBotUrl(url);
            showMessage('Bot activated!');
        }
    }, [setBotUrl, showMessage]);

    useEffect(() => {
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, [onMessage]);

    useEffect(() => {
        if (!botUrl) {
            window.addEventListener('keydown', onKeyDown);
            return () => window.removeEventListener('keydown', onKeyDown);
        }
    }, [onKeyDown, botUrl]);

    useEffect(() => {
        if (frameRef.current && !numberOfMoves) {
            setTimeout(() => {
                frameRef.current?.contentWindow?.postMessage({
                    action: 'init',
                    payload: {
                        isFirst: activePlayer,
                        map: figures
                    }
                }, '*');
            }, 50);
        }
    }, [frameRef.current, activePlayer, figures, numberOfMoves]);

    return (
        <div>
            { botUrl && connected ? <iframe id="bot-frame" className="cg-hidden" ref={frameRef} src={botUrl} title="bot"/> : null }
            { inputOpened ? <UrlInputDialog onInput={onInput} /> : null }
        </div>
    );
}
