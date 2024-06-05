import { useContext } from 'react';
import { Context } from '../context';
import { GameStatus } from '../types';

export function Display() {
    const { gameStatus } = useContext(Context);
    return (
        <div className={`game-status ${gameStatus === GameStatus.Game ? 'hidden' : ''}`}>
            { gameStatus }
        </div>
    );
}
