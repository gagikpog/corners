import { useContext } from 'react';
import { Context } from '../context';
import { GameStatus } from '../types';

export function Display() {
    const { gameStatus } = useContext(Context);
    return (
        <div className={`cg-game-status ${gameStatus === GameStatus.Game ? 'cg-hidden' : ''}`}>
            { gameStatus }
        </div>
    );
}
