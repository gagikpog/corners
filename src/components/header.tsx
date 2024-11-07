import { useCallback, useContext } from 'react';
import { Context } from '../context';
import { copy, paste } from '../helpers/clipboard';
import { generateUrl, getPeerId } from '../helpers/url';
import { GameStatus, MessageType } from '../types';
import { Copy } from './icon/copy';
import { Paste } from './icon/paste';
import { QrIcon } from './icon/qr';
import { Reload } from './icon/reload';
import { useTranslation } from '../hooks/useTranslation';

export function Header() {

    const { peerId, activePlayer, connected, numberOfMoves, gameStatus, connectTo, showMessage, setQrVisible, newGame } = useContext(Context);
    const { tr } = useTranslation();

    const copyHandler = useCallback(() => {
        copy(generateUrl(peerId)).then(() => {
            showMessage(tr('message.copy-success'));
        }).catch(() => {
            showMessage(tr('message.copy-error'), MessageType.Error);
        });
    }, [peerId, showMessage, tr]);

    const pasteHandler = useCallback(() => {
        paste().then((text: string) => {
            const id = getPeerId(text);
            if (id) {
                connectTo(id);
                showMessage(tr('message.paste-success'));
            } else {
                showMessage(tr('message.paste-waring'), MessageType.Warn);
            }
        }).catch(() => {
            showMessage(tr('message.paste-error'), MessageType.Error);
        });
    }, [connectTo, showMessage, tr]);

    const toggleQr = useCallback(() => {
        setQrVisible((val) => !val);
    }, [setQrVisible])

    const reloadHandler = useCallback(() => {
        newGame(true);
    }, [newGame]);

    return (
        <header className='cg-header'>
            <div className="cg-logo">{tr('game.title')}</div>
                <div className='cg-status-bar'>
                    <div>
                        { connected ? activePlayer ? tr('state.your-move') : tr('state.opponent-move') : tr('state.not-connected') }
                    </div>
                    {
                        numberOfMoves ? (
                            <>
                                <div>|</div>
                                <div> {tr('move-count-title')} {numberOfMoves} </div>
                            </>
                        ) : null
                    }
                </div>
                <div className="cg-toolbar">
                    { connected ? null : <QrIcon onClick={toggleQr} className='cg-button' /> }
                    { gameStatus === GameStatus.Game ? null : <Reload onClick={reloadHandler} className='cg-button' /> }
                    { connected ? null : <Paste onClick={pasteHandler} className='cg-button' /> }
                    { connected ? null : <Copy onClick={copyHandler} className='cg-button' /> }
                </div>
        </header>
    );
}
