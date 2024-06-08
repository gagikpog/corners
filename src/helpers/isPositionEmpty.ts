import { IFigure, IPosition } from '../types';
import { getFigureKey } from './getFigureKey';

export function isPositionEmpty(figuresMap: Map<string, IFigure>, pos: IPosition): boolean {
    return !figuresMap.get(getFigureKey(pos));
}
