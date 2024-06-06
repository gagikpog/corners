import { useContext } from 'react';
import { Context } from '../context';
import { GAME_SIZE } from '../constants';

const ITEMS_ARRAY = Array(GAME_SIZE * (GAME_SIZE + 1)).fill(null);

export default function Board() {

    const { moveSelected, activePlayer, lastMove } = useContext(Context);

    return (
        <>
            {
                ITEMS_ARRAY.map((_, index): JSX.Element => {
                    const x = index % (GAME_SIZE + 1);
                    const y = Math.floor(index / (GAME_SIZE + 1));
                    const fromClassName = lastMove.from.x === x && lastMove.from.y === y ? 'active-from' : '';
                    const toClassName = lastMove.to.x === x && lastMove.to.y === y ? 'active-to' : '';

                    return (
                        <div className={`item ${(index + 1) % (GAME_SIZE + 1) === 0 ? 'hide' : ''} ${fromClassName} ${toClassName}`}
                             key={index}
                             onClick={() => activePlayer && moveSelected({ x , y})}
                        ></div>
                    );
                })
            }
        </>
    );
}
