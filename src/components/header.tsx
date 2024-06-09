import { useCallback, useContext } from 'react';
import { Context } from '../context';
import { copy, paste } from '../helpers/clipboard';
import { generateUrl, getPeerId } from '../helpers/url';
import { MessageType } from '../types';
import { Copy } from './icon/copy';
import { Paste } from './icon/paste';

export function Header() {

    const { peerId, activePlayer, connected, numberOfMoves, connectTo, showMessage } = useContext(Context);

    const copyHandler = useCallback(() => {
        copy(generateUrl(peerId)).then(() => {
            showMessage(`Link copied successfully!`);
        }).catch(() => {
            showMessage(`Error copying link!`, MessageType.Error);
        });
    }, [peerId, showMessage]);

    const pasteHandler = useCallback(() => {
        paste().then((text: string) => {
            const id = getPeerId(text);
            if (id) {
                connectTo(id);
                showMessage(`Link inserted successfully!`);
            } else {
                showMessage(`Can't connect, wrong URL!`, MessageType.Warn);
            }
        }).catch(() => {
            showMessage(`Error when inserting link!`, MessageType.Error);
        });
    }, [connectTo, showMessage]);

    return (
        <header className='cg-header'>
            <div className="cg-logo">Corners</div>
                <div className='cg-status-bar'>
                    <div>
                        { connected ? activePlayer ? 'your move' : `opponent's move` : 'not connected' }
                    </div>
                    {
                        numberOfMoves ? (
                            <>
                                <div>|</div>
                                <div> move {numberOfMoves} </div>
                            </>
                        ) : null
                    }
                </div>
                <div className="cg-toolbar">
                    <Paste onClick={pasteHandler} className='cg-button' />
                    <Copy onClick={copyHandler} className='cg-button' />
                </div>
        </header>
    );
}
