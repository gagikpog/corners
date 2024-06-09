import { CSSProperties, useContext } from 'react';
import { GAME_SIZE } from '../constants';
import Board from './board';
import { Figures } from './figures';
import { Context } from '../context';
import '../styles/game.css';
import { Qr } from './qr';

export function Game() {

    const { boardRotate, connected, qrVisible } = useContext(Context);
    const boardVisible = connected || !qrVisible;
    return (
        <div className={`cg-game cg-board-rotated-${boardRotate} cg-game-${boardVisible ? 'board' : 'qr'}`}
            style={{ '--game-size': GAME_SIZE } as CSSProperties}>
            {
                boardVisible ? <> <Board /> <Figures /> </> : <Qr />
            }
        </div>
    );
}
