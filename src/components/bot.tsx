import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../context';
import { IFrameMessage, ILastMove } from '../types';
import { UrlInputDialog } from './urlInputDialog';
import { useTranslation } from '../hooks/useTranslation';

export function Bot() {
    const frameRef = useRef<HTMLIFrameElement>(null);
    const isInitRef = useRef<boolean>(false);
    const { activePlayer, firstPlayer, figures, connected, botUrl, settings, setBotUrl, showMessage, moveSelected } = useContext(Context);
    const [inputOpened, setInputOpened] = useState(false);
    const frame = frameRef.current;
    const { tr } = useTranslation();

    const onMessage = useCallback((event: MessageEvent<IFrameMessage>) => {
        switch (event.data.action) {
            case 'step':
                const move = event.data.payload as ILastMove;
                const moved = moveSelected(move);
                if (!moved) {
                    console.error(`Invalid move from [${move.from.y}, ${move.from.y}] to [${move.to.y}, ${move.to.y}]`);
                }
                break;
            default:
                if (event.data.action) {
                    console.error(`Invalid action "${event.data.action}"`);
                }
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
        }
    }, [setBotUrl]);

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
        if (frame && !isInitRef.current) {
            isInitRef.current = true;
            setTimeout(() => {
                frame.contentWindow?.postMessage({
                    action: 'init',
                    payload: {
                        isFirst: firstPlayer,
                        map: figures,
                        activePlayer,
                        width: settings.itemsWidth,
                        height: settings.itemsHeight
                    }
                }, '*');
            }, 50);
        }
    }, [frame, activePlayer, firstPlayer, figures, isInitRef, settings]);

    const onLoad = useCallback(() => showMessage(tr('message.bot-activated')), [showMessage, tr]);

    return (
        <div>
            { botUrl && connected ? <iframe id="bot-frame" className="cg-hidden" ref={frameRef} src={botUrl} title="bot" onLoad={onLoad} /> : null }
            { inputOpened ? <UrlInputDialog onInput={onInput} onCancel={() => setInputOpened(false)} /> : null }
        </div>
    );
}
