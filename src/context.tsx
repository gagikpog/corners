import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Color, GameStatus, IFigure, ILastMove, IMessage, IPosition, IProps, IRequest, MessageType, ResponseActions, ServiceEvents } from './types';
import { generateFigures } from './helpers/generateFigures';
import { useService } from './hooks/useService';
import { calculatePath } from './helpers/calculatePath';
import { moveTo } from './helpers/animation';
import { getPlayerColor } from './helpers/getPlayerColor';
import { getMessageId } from './helpers/getId';
import { checkGameEnd } from './helpers/checkGameEnd';
import { EMPTY_POSITION } from './constants';

interface IContextData {
    figures: IFigure[];
    selected: IPosition;
    peerId: string;
    connected: boolean;
    activePlayer: boolean;
    numberOfMoves: number;
    messages: IMessage[];
    gameStatus: GameStatus;
    lastMove: ILastMove;
    connectTo(peerId: string): void;
    setSelected(pos: IPosition): void;
    moveSelected(pos: IPosition): void;
    showMessage(message: string, type?: MessageType): void;
}

export const Context = createContext<IContextData>({} as IContextData);

export function Provider({ children }: IProps) {

    const [activePlayer, setActivePlayer] = useState<boolean>(false);
    const [firstPlayer, setFirstPlayer] = useState<boolean>(false);
    const [figures, setFigures] = useState<IFigure[]>(generateFigures(Color.Black));
    const [selected, setSelected] = useState<IPosition>(EMPTY_POSITION);
    const [numberOfMoves, setNumberOfMoves] = useState<number>(0);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Game);
    const [lastMove, setLastMove] = useState<ILastMove>({ from: EMPTY_POSITION, to: EMPTY_POSITION });
    const { connectTo, send, peerId, connected, service } = useService();

    const showMessage = useCallback((message: string, type: MessageType = MessageType.Info) => {
        const data: IMessage = {
            id: getMessageId(),
            text: message,
            type
        };
        setMessages((prev) => [...prev, data]);
        setTimeout(() => {
            setMessages((prev) => prev.filter((currentMessage) => currentMessage.id !== data.id));
        }, 3000);
    }, []);

    const moveSelected = useCallback((pos: IPosition) => {
        if (selected.x !== EMPTY_POSITION.x && selected.y !== EMPTY_POSITION.y) {
            const figure = figures.find((item) => item.x === selected.x && item.y === selected.y);
            if (figure) {
                const path = calculatePath(figures, figure, pos);
                if (path.length) {
                    send({ from: { x: figure.x, y: figure.y }, path });
                    setActivePlayer(false);
                    setSelected(EMPTY_POSITION);
                    moveTo(figure, path).then(() => {
                        setLastMove({ from: { x: figure.x, y: figure.y }, to: pos });
                        figure.x = pos.x;
                        figure.y = pos.y;
                        setFigures((prev) => [...prev]);
                        setNumberOfMoves((n) => n + 1);
                    });
                }
            }
        }

    }, [figures, selected, send]);

    useEffect(() => {
        if (connected && numberOfMoves % 2 === 0) {
            setFigures((prev) => {
                const stats = checkGameEnd(prev, firstPlayer);
                setGameStatus(stats);
                return prev;
            });
        }
    }, [numberOfMoves, firstPlayer, connected]);

    useEffect(() => {
        return service.subscribe<IRequest>(ServiceEvents.Data, (data) => {
            switch (data.data.action) {
                case ResponseActions.Play:
                    const payload = data.data.payload as { path: IPosition[], from: IPosition };
                    const path = payload.path as IPosition[];
                    const from = payload.from as IPosition;
                    const figure = figures.find((item) => item.x === from.x && item.y === from.y);

                    if (figure) {
                        moveTo(figure, path).then(() => {
                            const pos = path[path.length -1];
                            setLastMove({ from: { x: figure.x, y: figure.y }, to: pos });
                            figure.x = pos.x;
                            figure.y = pos.y;
                            setFigures((prev) => [...prev]);
                            setSelected(EMPTY_POSITION);
                            setNumberOfMoves((n) => n + 1);
                            setActivePlayer(true);
                        });
                    }
                    break;
            }
        });
    }, [service, figures]);

    useEffect(() => {
        return service.subscribe<boolean>(ServiceEvents.Connection ,(connected: boolean) => {
            const {extPickId, peerId} = service.getPeerIds();
            const color = getPlayerColor(peerId, extPickId);
            setFigures(generateFigures(color));
            setActivePlayer(color === Color.Black);
            setFirstPlayer(color === Color.Black);
            showMessage('Connecting to an opponent!');
        });
    }, [service, showMessage]);

    useEffect(() => {
        const subscribers = [
            service.subscribe(ServiceEvents.Open, (peerId: string) => {
                if (peerId) {
                    showMessage('Opening connection, wait for the opponent!');
                }
            }),
            service.subscribe(ServiceEvents.Error, (message: string) => {
                showMessage(message);
            })
        ];
        return () => subscribers.forEach((func) => func());
    }, [service, showMessage]);


    const value = useMemo<IContextData>((): IContextData => {
        return {
            figures,
            selected,
            peerId,
            connected,
            activePlayer,
            messages,
            numberOfMoves,
            gameStatus,
            lastMove,
            connectTo,
            setSelected,
            moveSelected,
            showMessage
        };
    }, [
        figures,
        selected,
        peerId,
        connected,
        activePlayer,
        messages,
        numberOfMoves,
        gameStatus,
        lastMove,
        connectTo,
        setSelected,
        moveSelected,
        showMessage
    ]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
