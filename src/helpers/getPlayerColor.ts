import { Color } from '../types';

function uuidToNumber(uuid: string): number {
    return Number(uuid.replace(/[a-z-]/gi, '').substring(0, 6));
}

export function getPlayerColor(myPeerId: string, opponentPeerId: string): Color {
    return uuidToNumber(myPeerId) > uuidToNumber(opponentPeerId) ? Color.Black : Color.White;
}
