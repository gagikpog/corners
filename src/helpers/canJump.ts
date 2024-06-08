import { IFigure, IPosition } from '../types';
import { isPositionEmpty } from './isPositionEmpty';
import { isValidPos } from './isValidPos';

export function canJump(figuresMap: Map<string, IFigure>, from: IPosition, to: IPosition): boolean {
    const middle = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
    return !isPositionEmpty(figuresMap, middle) && isPositionEmpty(figuresMap, to) && isValidPos(to);
}
