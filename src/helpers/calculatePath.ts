import { IFigure, IPosition } from '../types';
import { canJump } from './canJump';
import { getFigureKey } from './getFigureKey';
import { isValidPos } from './isValidPos';
import { toMap } from './toMap';

const checkedPositions = new Set<string>();

function stepToNeighbor(figure: IFigure, pos: IPosition): boolean {
    return (pos.x === figure.x && Math.abs(pos.y - figure.y) === 1) ||
        (pos.y === figure.y && Math.abs(pos.x - figure.x) === 1);
}

export function calculatePath(figures: IFigure[], figure: IFigure, pos: IPosition): IPosition[] {

    if (stepToNeighbor(figure, pos)) {
        return [pos];
    }

    const figuresMap = toMap(figures);

    checkedPositions.clear();
    const res = findPathStep(figuresMap, figure, pos);
    return res;
}

function comparePos(pos1: IPosition, pos2: IPosition) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function findPathStep(figuresMap: Map<string, IFigure>, currentPos: IPosition, endPos: IPosition): IPosition[] {

    if (!isValidPos(currentPos) || checkedPositions.has(getFigureKey(currentPos))) {
        return [];
    }
    checkedPositions.add(getFigureKey(currentPos));

    const leftPos = { x: currentPos.x - 2, y: currentPos.y };
    const rightPos = { x: currentPos.x + 2, y: currentPos.y };
    const topPos = { x: currentPos.x, y: currentPos.y - 2};
    const bottomPos = { x: currentPos.x, y: currentPos.y + 2};

    const positions = [leftPos, rightPos, topPos, bottomPos];

    if (positions.some((jumpPos) => comparePos(jumpPos, endPos) && canJump(figuresMap, currentPos, jumpPos))) {
        return [endPos];
    }

    return positions.reduce((res: IPosition[], jumpPos: IPosition) => {
        if (res.length || !canJump(figuresMap, currentPos, jumpPos)) {
            return res;
        }

        const resPos = findPathStep(figuresMap, jumpPos, endPos);
        if (resPos.length) {
            return [jumpPos, ...resPos];
        }
        return resPos
    }, []);
}
