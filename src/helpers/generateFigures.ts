import { Figure } from '../models/figure';
import { IFigure } from '../types';

export function generateFigures(): IFigure[] {

    const figures: IFigure[] = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            figures.push(new Figure({x: i, y: j, color: 'white', owner: true}));
        }
    }

    for (let i = 5; i < 8; i++) {
        for (let j = 5; j < 8; j++) {
            figures.push(new Figure({x: i, y: j, color: 'black', owner: false}));
        }
    }

    return figures;
}
