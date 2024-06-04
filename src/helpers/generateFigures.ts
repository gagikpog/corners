import { Figure } from '../models/figure';
import { Color, IFigure } from '../types';
import { getFigureId } from './getId';

export function generateFigures(color: Color): IFigure[] {

    const figures: IFigure[] = [];

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 4; x++) {
            figures.push(new Figure({x, y, color: Color.Black, owner: color === Color.Black, id: getFigureId()}));
        }
    }

    for (let y = 5; y < 8; y++) {
        for (let x = 4; x < 8; x++) {
            figures.push(new Figure({x, y, color: Color.White, owner: color === Color.White, id: getFigureId()}));
        }
    }

    return figures;
}
