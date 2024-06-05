import { GAME_SIZE, ITEMS_HIGHT, ITEMS_WIDTH } from '../constants';
import { GameStatus, IFigure } from '../types';

export function checkGameEnd(figures: IFigure[], firstPlayer: boolean): GameStatus {
    let opponentCount = 0;
    let playerCount = 0;
    let res = '';

    figures.forEach((figure) => {
        if (firstPlayer) {
            if (figure.owner && figure.x >= GAME_SIZE - ITEMS_WIDTH && figure.y >= GAME_SIZE - ITEMS_HIGHT) {
                playerCount++
            }
            if (!figure.owner && figure.x < ITEMS_WIDTH && figure.y < ITEMS_HIGHT) {
                opponentCount++
            }
        } else {
            if (figure.owner && figure.x < ITEMS_WIDTH && figure.y < ITEMS_HIGHT) {
                playerCount++
            }
            if (!figure.owner && figure.x >= GAME_SIZE - ITEMS_WIDTH && figure.y >= GAME_SIZE - ITEMS_HIGHT) {
                opponentCount++
            }
        }
    });

    if (opponentCount === ITEMS_WIDTH * ITEMS_HIGHT) {
        res = 'lose';
    }
    if (playerCount === ITEMS_WIDTH * ITEMS_HIGHT) {
        res += 'win';
    }

    switch (res) {
        case 'lose':
            return GameStatus.Lose;
        case 'win':
            return GameStatus.Win;
        case 'losewin':
            return GameStatus.Draw;
        default:
            return GameStatus.Game;
    }
}
