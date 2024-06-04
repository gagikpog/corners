import { IPosition } from '../types';

export function getFigureKey(pos: IPosition) {
    return `${pos.x},${pos.y}`;
}
