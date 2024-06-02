export enum Color {
    White = 'white',
    Black = 'black'
}

export interface IProps {
    className?: string;
    children?: JSX.Element;
}

export interface IPosition {
    x: number;
    y: number;
}

export interface IFigure extends IPosition {
    color: Color;
    owner: boolean;
}

