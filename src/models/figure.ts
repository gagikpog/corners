import { Color, IFigure } from '../types';

export class Figure implements IFigure {
    id: string
    x: number;
    y: number;
    owner: boolean;
    color: Color;

    constructor({ x, y, owner, color, id }: IFigure) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.color = color;
    }
}
