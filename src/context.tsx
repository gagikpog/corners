import { Dispatch, SetStateAction, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { BoardRotate, Color, GameStatus, IFigure, ILastMove, IMessage, IPosition, IProps, IRequest, ISettings, MessageType, ResponseActions, ServiceEvents } from './types';
import { generateFigures } from './helpers/generateFigures';
import { useService } from './hooks/useService';
import { calculatePath } from './helpers/calculatePath';
import { moveTo } from './helpers/animation';
import { getPlayerColor } from './helpers/getPlayerColor';
import { getMessageId } from './helpers/getId';
import { checkGameEnd } from './helpers/checkGameEnd';
import { EMPTY_POSITION } from './constants';
import calculateMoves from './helpers/calculateMoves';
import { sendBot } from './helpers/sendBot';

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
    moves: Set<string>;
    settings: ISettings;
    boardRotate: BoardRotate;
    qrVisible: boolean;
    firstPlayer: boolean;
    botUrl: string;
    connectTo(peerId: string): void;
    setSelected(pos: IPosition): void;
    moveSelected(move: ILastMove): void;
    showMessage(message: string, type?: MessageType): void;
    setSettings(settings: ISettings): void;
    setBoardRotate: Dispatch<SetStateAction<BoardRotate>>;
    setQrVisible: Dispatch<SetStateAction<boolean>>;
    newGame(needSync?: boolean): void;
    setBotUrl(url: string): void;
}

export const Context = createContext<IContextData>({} as IContextData);

export function Provider({ children }: IProps) {

    const { connectTo, sendMove, setSettings, sendNewGame, peerId, connected, service, settings } = useService();
    const [activePlayer, setActivePlayer] = useState<boolean>(false);
    const [firstPlayer, setFirstPlayer] = useState<boolean>(false);
    const [figures, setFigures] = useState<IFigure[]>(generateFigures(Color.Black, settings));
    const [selected, setSelected] = useState<IPosition>(EMPTY_POSITION);
    const [numberOfMoves, setNumberOfMoves] = useState<number>(0);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Game);
    const [lastMove, setLastMove] = useState<ILastMove>({ from: EMPTY_POSITION, to: EMPTY_POSITION });
    const [moves, setMoves] = useState<Set<string>>(new Set());
    const [boardRotate, setBoardRotate] = useState<BoardRotate>(BoardRotate.Unset);
    const [qrVisible, setQrVisible] = useState<boolean>(false);
    const [botUrl, setBotUrl] = useState<string>('');

    const newGame = useCallback((needSync: boolean = false) => {
        setFirstPlayer((value) => {
            const newValue = !value;
            setActivePlayer(newValue);
            return newValue;
        });
        setSelected(EMPTY_POSITION);
        setNumberOfMoves(0);
        setLastMove({ from: EMPTY_POSITION, to: EMPTY_POSITION });
        setMoves(new Set());
        setGameStatus(GameStatus.Game);
        if (needSync) {
            sendNewGame();
        }
    }, [sendNewGame]);

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

    const moveSelected = useCallback(({ from, to }: ILastMove) => {
        if (from.x !== EMPTY_POSITION.x && from.y !== EMPTY_POSITION.y) {
            const figure = figures.find((item) => item.x === from.x && item.y === from.y);
            if (figure) {
                const path = calculatePath(figures, figure, to);
                if (path.length) {
                    sendMove({ from, path });
                    setActivePlayer(false);
                    setSelected(EMPTY_POSITION);
                    moveTo(figure, path).then(() => {
                        setLastMove({ from, to });
                        figure.x = to.x;
                        figure.y = to.y;
                        setFigures((prev) => [...prev]);
                        setNumberOfMoves((n) => n + 1);
                    });
                }
            }
        }
    }, [figures, sendMove]);

    useEffect(() => {
        if (connected && numberOfMoves && numberOfMoves % 2 === 0) {
            setFigures((prev) => {
                const stats = checkGameEnd({ figures: prev, firstPlayer, settings });
                setGameStatus(stats);
                return prev;
            });
        }
    }, [numberOfMoves, firstPlayer, connected, settings]);

    useEffect(() => {
        if (selected.x !== EMPTY_POSITION.x && selected.y !== EMPTY_POSITION.y) {
            setMoves(calculateMoves(selected, figures));
        } else {
            setMoves(new Set());
        }
    }, [selected, figures]);

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
                            const move = { from: { x: figure.x, y: figure.y }, to: pos };
                            setLastMove(move);
                            figure.x = pos.x;
                            figure.y = pos.y;
                            setFigures((prev) => [...prev]);
                            setSelected(EMPTY_POSITION);
                            setNumberOfMoves((n) => n + 1);
                            setActivePlayer(true);
                            if (botUrl) {
                                sendBot(move);
                            }
                        });
                    }
                    break;
                case ResponseActions.NewGame:
                    newGame();
                    break;
            }
        });
    }, [service, figures, botUrl, newGame]);

    useEffect(() => {
        return service.subscribe<boolean>(ServiceEvents.Connection ,(connected: boolean) => {
            const {extPickId, peerId} = service.getPeerIds();
            const color = getPlayerColor(peerId, extPickId);
            const isFirst = color === Color.Black;
            setActivePlayer(isFirst);
            setFirstPlayer(isFirst);
            showMessage('Connecting to an opponent!');
        });
    }, [service, showMessage]);

    useEffect(() => {
        setFigures(generateFigures(firstPlayer ? Color.Black : Color.White, settings));
    }, [service, settings, connected, firstPlayer]);

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
            moves,
            settings,
            boardRotate,
            qrVisible,
            firstPlayer,
            botUrl,
            connectTo,
            setSelected,
            moveSelected,
            showMessage,
            setSettings,
            setBoardRotate,
            setQrVisible,
            newGame,
            setBotUrl
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
        moves,
        settings,
        boardRotate,
        qrVisible,
        firstPlayer,
        botUrl,
        connectTo,
        setSelected,
        moveSelected,
        showMessage,
        setSettings,
        setBoardRotate,
        setQrVisible,
        newGame,
        setBotUrl
    ]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
