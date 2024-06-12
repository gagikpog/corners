export enum Color {
    White = 'white',
    Black = 'black'
}

export enum ServiceEvents {
    Connection = 'connection',
    Data = 'data',
    Open = 'open',
    Error = 'error'
}

export enum ResponseActions {
    Play = 'play',
    NewGame = 'newGame',
    SyncSettings = 'syncSettings',
    Connect = 'connect'
}

export enum MessageType {
    Error = 'error',
    Info = 'info',
    Warn =  'warn'
}

export enum GameStatus {
    Game = 'game',
    Lose = 'lose',
    Win = 'win',
    Draw = 'draw'
}

export enum BoardRotate {
    Unset = '-',
    Default = '0',
    Rotated = '180'
}

export interface IProps {
    className?: string;
    children?: JSX.Element;
    onClick?(): void;
}

export interface IPosition {
    x: number;
    y: number;
}

export interface IFigure extends IPosition {
    id: string;
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

export interface IMessage {
    text: string;
    id: string;
    type: MessageType
}

export interface ILastMove {
    from: IPosition;
    to: IPosition;
}

export interface ISettings {
    itemsWidth: number;
    itemsHight: number;
}
