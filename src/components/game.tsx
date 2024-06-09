import { CSSProperties, useContext } from 'react';
import { GAME_SIZE } from '../constants';
import Board from './board';
import { Figures } from './figures';
import { Context } from '../context';
import '../styles/game.css';

export function Game() {

    const { boardRotate } = useContext(Context);

    return (
        <div className={`cg-game cg-board-rotated-${boardRotate}`} style={{ '--game-size': GAME_SIZE } as CSSProperties}>
            <Board />
            <Figures />
        </div>
    );
}
