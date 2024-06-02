import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Color, IFigure, IPosition, IProps, IRequest, ResponseActions, ServiceEvents } from './types';
import { generateFigures } from './helpers/generateFigures';
import { useService } from './hooks/useService';
import { calculatePath } from './helpers/calculatePath';
import { moveTo } from './helpers/animation';
import { getPlayerColor } from './helpers/getPlayerColor';

interface IContextData {
    figures: IFigure[];
    selected: IPosition;
    peerId: string;
    connected: boolean;
    activePlayer: boolean;
    connectTo(peerId: string): void;
    setSelected(pos: IPosition): void;
    moveSelected(pos: IPosition): void;
}

export const Context = createContext<IContextData>({} as IContextData);

export function Provider({ children }: IProps) {

    const [activePlayer, setActivePlayer] = useState<boolean>(false);
    const [figures, setFigures] = useState<IFigure[]>(generateFigures(Color.Black));
    const [selected, setSelected] = useState<IPosition>({ x: 1, y: 1 });
    const { connectTo, send, peerId, connected, service } = useService();

    const moveSelected = useCallback((pos: IPosition) => {
        if (selected.x !== -1 && selected.y !== -1) {
            const figure = figures.find((item) => item.x === selected.x && item.y === selected.y);
            if (figure) {
                const path = calculatePath(figures, figure, pos);
                if (path.length) {
                    send({ from: { x: figure.x, y: figure.y }, path });
                    moveTo(figure, path).then(() => {
                        figure.x = pos.x;
                        figure.y = pos.y;
                        setFigures((prev) => [...prev]);
                        setSelected({ x: -1, y: -1 });
                    });
                    setActivePlayer(false);
                }
            }
        }

    }, [figures, selected, send]);

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
                            figure.x = pos.x;
                            figure.y = pos.y;
                            setFigures((prev) => [...prev]);
                            setSelected({ x: -1, y: -1 });
                        });
                        setActivePlayer(true);
                    }

                    console.log('play', data.data.payload);
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
        });
    }, [service]);


    const value = useMemo<IContextData>((): IContextData => {
        return {
            figures,
            selected,
            peerId,
            connected,
            activePlayer,
            connectTo,
            setSelected,
            moveSelected
        };
    }, [figures, selected, peerId, connected, connectTo, setSelected, moveSelected, activePlayer]);

    // @ts-ignore
    window.send = send;

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
