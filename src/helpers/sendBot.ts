import { ILastMove } from '../types';

export function sendBot(payload: ILastMove) {
    const node = document.querySelector<HTMLIFrameElement>('#bot-frame');
    if (node) {
        node.contentWindow?.postMessage({ action: 'step', payload }, '*');
    }
}
