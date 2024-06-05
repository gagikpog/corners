import { GAME_SIZE } from '../constants';
import { IFigure, IPosition } from '../types';
import { getFigureKey } from './getFigureKey';

const checkedPositions = new Set<string>();


function stepToNeighbor(figure: IFigure, pos: IPosition): boolean {
    return (pos.x === figure.x && Math.abs(pos.y - figure.y) === 1) ||
        (pos.y === figure.y && Math.abs(pos.x - figure.x) === 1);
}

export function calculatePath(figures: IFigure[], figure: IFigure, pos: IPosition): IPosition[] {

    if (stepToNeighbor(figure, pos)) {
        return [pos];
    }

    const figuresMap = figures.reduce((res, item) => {
        res.set(getFigureKey(item), item);
        return res;
    }, new Map());


    checkedPositions.clear();
    const res = findPathStep(figuresMap, figure, pos);
    return res;
}

function comparePos(pos1: IPosition, pos2: IPosition) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function isValidPos(pos: IPosition) {
    return pos.x >= 0 && pos.x < GAME_SIZE && pos.y >= 0 && pos.y < GAME_SIZE;
}

function isEmpty(figuresMap: Map<string, IFigure>, pos: IPosition): boolean {
    return !figuresMap.get(getFigureKey(pos));
}

function canJump(figuresMap: Map<string, IFigure>, from: IPosition, to: IPosition): boolean {
    const middle = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
    return !isEmpty(figuresMap, middle) && isEmpty(figuresMap, to);
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
