import { GAME_SIZE, ITEMS_HIGHT, ITEMS_WIDTH } from '../constants';
import { Figure } from '../models/figure';
import { Color, IFigure } from '../types';
import { getFigureId } from './getId';

export function generateFigures(color: Color): IFigure[] {

    const figures: IFigure[] = [];

    for (let y = 0; y < ITEMS_HIGHT; y++) {
        for (let x = 0; x < ITEMS_WIDTH; x++) {
            figures.push(new Figure({x, y, color: Color.Black, owner: color === Color.Black, id: getFigureId()}));
        }
    }

    for (let y = GAME_SIZE - ITEMS_HIGHT; y < GAME_SIZE; y++) {
        for (let x = GAME_SIZE - ITEMS_WIDTH; x < GAME_SIZE; x++) {
            figures.push(new Figure({x, y, color: Color.White, owner: color === Color.White, id: getFigureId()}));
        }
    }

    return figures;
}
