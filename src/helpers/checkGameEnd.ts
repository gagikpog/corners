import { GAME_SIZE, ITEMS_HIGHT, ITEMS_WIDTH } from '../constants';
import { IFigure } from '../types';

export function checkGameEnd(figures: IFigure[], firstPlayer: boolean): string {
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
            return 'lose';
        case 'win':
            return 'win';
        case 'losewin':
            return 'gameDraw';
        default:
            return 'process';
    }
}
