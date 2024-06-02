import { Figure } from '../models/figure';
import { Color, IFigure } from '../types';
import { getFigureId } from './getId';

export function generateFigures(): IFigure[] {

    const figures: IFigure[] = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            figures.push(new Figure({x: i, y: j, color: Color.Black, owner: true, id: getFigureId()}));
        }
    }

    for (let i = 5; i < 8; i++) {
        for (let j = 5; j < 8; j++) {
            figures.push(new Figure({x: i, y: j, color: Color.White, owner: false, id: getFigureId()}));
        }
    }

    return figures;
}
