import { useContext } from 'react';
import { Context } from '../context';
import { GAME_SIZE } from '../constants';

const ITEMS_ARRAY = Array(GAME_SIZE * (GAME_SIZE + 1)).fill(null);

export default function Board() {

    const { moveSelected, activePlayer } = useContext(Context);

    return (
        <>
            {
                ITEMS_ARRAY.map((_, index): JSX.Element => {
                    return (
                        <div className={`item ${(index + 1) % (GAME_SIZE + 1) === 0 ? 'hide' : ''}`}
                             key={index}
                             onClick={() => activePlayer && moveSelected({ x: index % (GAME_SIZE + 1), y: Math.floor(index / (GAME_SIZE + 1))})}
                        ></div>
                    );
                })
            }
        </>
    );
}
