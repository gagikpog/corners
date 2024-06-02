import { useCallback, useContext } from 'react';
import { Context } from '../context';
import { copy, paste } from '../helpers/clipboard';
import { generateUrl, getPeerId } from '../helpers/url';

export function Header() {

    const { peerId, connectTo } = useContext(Context);

    const copyHandler = useCallback(() => {
        copy(generateUrl(peerId));
    }, [peerId]);

    const pasteHandler = useCallback(() => {
        paste().then((text: string) => {
            const id = getPeerId(text);
            if (id) {
                connectTo(id);
            } else {
                // TODO написать сообщение об ошибке
            }
        })
    }, [connectTo]);

    return (
        <header>
            <div className="logo">Corners</div>
             <div className="toolbar">
                <div className='button' onClick={pasteHandler}>Paste URL</div>
                <div className='button' onClick={copyHandler}>Copy URL</div>
            </div>
        </header>
    );
}
