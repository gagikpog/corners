import { GAME_SIZE } from '../constants';
import { GameStatus, IFigure, ISettings } from '../types';

interface ICheckGameEndOptions {
    figures: IFigure[];
    firstPlayer: boolean;
    settings: ISettings;
}

export function checkGameEnd({ figures, firstPlayer, settings }: ICheckGameEndOptions): GameStatus {
    let opponentCount = 0;
    let playerCount = 0;
    let res = '';

    figures.forEach((figure) => {
        if (firstPlayer) {
            if (figure.owner && figure.x >= GAME_SIZE - settings.itemsWidth && figure.y >= GAME_SIZE - settings.itemsHeight) {
                playerCount++
            }
            if (!figure.owner && figure.x < settings.itemsWidth && figure.y < settings.itemsHeight) {
                opponentCount++
            }
        } else {
            if (figure.owner && figure.x < settings.itemsWidth && figure.y < settings.itemsHeight) {
                playerCount++
            }
            if (!figure.owner && figure.x >= GAME_SIZE - settings.itemsWidth && figure.y >= GAME_SIZE - settings.itemsHeight) {
                opponentCount++
            }
        }
    });

    if (opponentCount === settings.itemsWidth * settings.itemsHeight) {
        res = 'lose';
    }
    if (playerCount === settings.itemsWidth * settings.itemsHeight) {
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
