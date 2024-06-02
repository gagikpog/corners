import { IFigure, IPosition } from '../types';

export async function moveTo(figure: IFigure, path: IPosition[]): Promise<void> {
    const figureNode = document.getElementById(figure.id);
    if (figureNode) {
        for (let i = 0; i < path.length; i++) {
            await moveOne(figureNode, path[i]);
        }
    }
}

function moveOne(node: HTMLElement, pos: IPosition): Promise<void> {
    node.style.setProperty('--left', `${pos.x}`);
    node.style.setProperty('--top', `${pos.y}`);
    node.style.setProperty('z-index', '1');
    return new Promise((resolve) => {
        node.addEventListener('transitionend', () => {
            node.style.removeProperty('z-index');
            resolve()
        }, {once: true});
    });
}
