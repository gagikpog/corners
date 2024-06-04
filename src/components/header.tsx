import { useCallback, useContext } from 'react';
import { Context } from '../context';
import { copy, paste } from '../helpers/clipboard';
import { generateUrl, getPeerId } from '../helpers/url';
import { MessageType } from '../types';

export function Header() {

    const { peerId, activePlayer, connected, connectTo, showMessage } = useContext(Context);

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
        <header>
            <div className="logo">Corners</div>
                <div className='status-bar'>
                    { connected ? activePlayer ? 'your move' : `opponent's move` : 'opponent is not connected' }
                </div>
                <div className="toolbar">
                    <button className='button' onClick={pasteHandler}>Paste URL</button>
                    <button className='button' onClick={copyHandler}>Copy URL</button>
                </div>
        </header>
    );
}
