import { GAME_SIZE } from '../constants';
import { Figure } from '../models/figure';
import { Color, IFigure, ISettings } from '../types';
import { getFigureId } from './getId';

export function generateFigures(color: Color, settings: ISettings): IFigure[] {

    const figures: IFigure[] = [];

    for (let y = 0; y < settings.itemsHeight; y++) {
        for (let x = 0; x < settings.itemsWidth; x++) {
            figures.push(new Figure({x, y, color: Color.Black, owner: color === Color.Black, id: getFigureId()}));
        }
    }

    for (let y = GAME_SIZE - settings.itemsHeight; y < GAME_SIZE; y++) {
        for (let x = GAME_SIZE - settings.itemsWidth; x < GAME_SIZE; x++) {
            figures.push(new Figure({x, y, color: Color.White, owner: color === Color.White, id: getFigureId()}));
        }
    }

    return figures;
}
