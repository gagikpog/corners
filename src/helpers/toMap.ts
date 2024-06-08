import { IPosition } from '../types';
import { getFigureKey } from './getFigureKey';

export function toMap<T extends IPosition = IPosition>(figures: T[]): Map<string, T> {
    return figures.reduce((res, item) => {
        res.set(getFigureKey(item), item);
        return res;
    }, new Map());
}
