import { GAME_SIZE } from '../constants';
import { IPosition } from '../types';

export function isValidPos(pos: IPosition) {
    return pos.x >= 0 && pos.x < GAME_SIZE && pos.y >= 0 && pos.y < GAME_SIZE;
}
