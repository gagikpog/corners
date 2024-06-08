import { IFigure, IPosition } from '../types';
import { canJump } from './canJump';
import { getFigureKey } from './getFigureKey';
import { isPositionEmpty } from './isPositionEmpty';
import { isValidPos } from './isValidPos';
import { toMap } from './toMap';

const checkedPositions = new Set<string>();

export default function calculateMoves(selected: IPosition, figures: IFigure[]): Set<string> {
    const figuresMap = toMap(figures);
    checkedPositions.clear();

    const moves = getNeighborMoves(selected, figuresMap);
    moves.push(...getJumpMoves(selected, figuresMap));

    return moves.reduce((acc, pos) => {
        acc.add(getFigureKey(pos));
        return acc;
    }, new Set<string>());
}

function getNeighborMoves(selected: IPosition, figuresMap: Map<string, IFigure>): IPosition[] {
    const leftPos = { x: selected.x - 1, y: selected.y };
    const rightPos = { x: selected.x + 1, y: selected.y };
    const topPos = { x: selected.x, y: selected.y - 1};
    const bottomPos = { x: selected.x, y: selected.y + 1};
    return [leftPos, rightPos, topPos, bottomPos].filter((pos) => isValidPos(pos) && isPositionEmpty(figuresMap, pos));
}

function getJumpMoves(currentPos: IPosition, figuresMap: Map<string, IFigure>): IPosition[] {

    if (!isValidPos(currentPos) || checkedPositions.has(getFigureKey(currentPos))) {
        return [];
    }
    checkedPositions.add(getFigureKey(currentPos));

    const leftPos = { x: currentPos.x - 2, y: currentPos.y };
    const rightPos = { x: currentPos.x + 2, y: currentPos.y };
    const topPos = { x: currentPos.x, y: currentPos.y - 2};
    const bottomPos = { x: currentPos.x, y: currentPos.y + 2};

    const positions = [leftPos, rightPos, topPos, bottomPos];

    return positions.reduce((res: IPosition[], jumpPos: IPosition) => {
        if (!canJump(figuresMap, currentPos, jumpPos)) {
            return res;
        }

        const resPos = getJumpMoves(jumpPos, figuresMap);
        return [...res, jumpPos, ...resPos];
    }, []);
}
