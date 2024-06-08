import { useContext } from 'react';
import { Context } from '../context';
import { GAME_SIZE } from '../constants';
import { getFigureKey } from '../helpers/getFigureKey';

const ITEMS_ARRAY = Array(GAME_SIZE * (GAME_SIZE + 1)).fill(null);

export default function Board() {

    const { moveSelected, activePlayer, lastMove, moves } = useContext(Context);

    return (
        <>
            {
                ITEMS_ARRAY.map((_, index): JSX.Element => {
                    const x = index % (GAME_SIZE + 1);
                    const y = Math.floor(index / (GAME_SIZE + 1));
                    const fromClassName = lastMove.from.x === x && lastMove.from.y === y ? ' cg-active-from' : '';
                    const toClassName = lastMove.to.x === x && lastMove.to.y === y ? ' cg-active-to' : '';
                    const moveToPositionClassName = moves.has(getFigureKey({x, y})) ? ' cg-active-move' : '';

                    return (
                        <div className={`cg-item${(index + 1) % (GAME_SIZE + 1) === 0 ? ' cg-hide' : ''}${fromClassName}${toClassName}${moveToPositionClassName}`}
                             key={index}
                             onClick={() => activePlayer && moveSelected({ x , y})}
                        ></div>
                    );
                })
            }
        </>
    );
}
