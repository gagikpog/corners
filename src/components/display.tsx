import { useContext } from 'react';
import { Context } from '../context';
import { GameStatus } from '../types';
import { useTranslation } from '../hooks/useTranslation';

export function Display() {
    const { gameStatus } = useContext(Context);
    const { tr } = useTranslation()
    return (
        <div className={`cg-game-status ${gameStatus === GameStatus.Game ? 'cg-hidden' : ''}`}>
            { tr(`status.${gameStatus}`) }
        </div>
    );
}
