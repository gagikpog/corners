import { useContext } from 'react';
import { Context } from '../context';

const ITEMS_ARRAY = Array(8 * 9).fill(null);

export default function Board() {

    const { moveSelected } = useContext(Context);

    return (
        <>
            {
                ITEMS_ARRAY.map((_, index): JSX.Element => {
                    return (
                        <div className="item"
                             key={index}
                             onClick={() => moveSelected({ x: index % 9, y: Math.floor(index / 9)})}
                        ></div>
                    );
                })
            }
        </>
    );
}
