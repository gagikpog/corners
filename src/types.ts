export interface IProps {
    className?: string;
    children?: JSX.Element;
}

export interface IFigure {
    color: string;
    x: number;
    y: number;
    owner: boolean;
}
