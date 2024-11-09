import { Color } from '../types';

export interface IFigureProps {
    color: Color;
    selected: boolean;
}

export default function getFigureSvgId({color, selected}: IFigureProps): string {
    return `cg-figure-${color}-${selected ? 'select' : 'normal'}`;
}
