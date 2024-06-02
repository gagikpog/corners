export enum Color {
    White = 'white',
    Black = 'black'
}

export enum ServiceEvents {
    Connection = 'connection',
    Data = 'data',
    Open = 'open'
}

export enum ResponseActions {
    Play = 'play',
    Connect = 'connect'
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

export interface IResponseData {
    action: ResponseActions;
    payload: unknown;
}

export interface IRequest {
    data: IResponseData;
    callId: string;
    needResult: boolean;
}
