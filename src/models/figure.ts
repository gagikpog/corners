import { Color, IFigure } from '../types';

export class Figure implements IFigure {
    x: number;
    y: number;
    owner: boolean;
    color: Color;

    constructor({ x, y, owner, color }: IFigure) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.color = color;
    }
}
