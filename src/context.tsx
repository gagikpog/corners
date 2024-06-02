import { createContext, useCallback, useMemo, useState } from 'react';
import { IFigure, IPosition, IProps } from './types';
import { generateFigures } from './helpers/generateFigures';
import { useService } from './hooks/useService';
import { calculatePath } from './helpers/calculatePath';
import { moveTo } from './helpers/animation';

interface IContextData {
    figures: IFigure[];
    selected: IPosition;
    peerId: string;
    connected: boolean;
    connectTo(peerId: string): void;
    setSelected(pos: IPosition): void;
    moveSelected(pos: IPosition): void;
}

export const Context = createContext<IContextData>({} as IContextData);

export function Provider({ children }: IProps) {

    const [figures, setFigures] = useState<IFigure[]>(generateFigures);
    const [selected, setSelected] = useState<IPosition>({ x: 1, y: 1 });
    const { connectTo, send, peerId, connected } = useService();

    const moveSelected = useCallback((pos: IPosition) => {
        console.log(pos);

        if (selected.x !== -1 && selected.y !== -1) {
            const figure = figures.find((item) => item.x === selected.x && item.y === selected.y);
            if (figure) {
                const path = calculatePath(figures, figure, pos);
                moveTo(figure, path).then(() => {
                    setFigures((prev) => [...prev]);
                    setSelected({x: -1, y: -1});
                });
            }
        }

    }, [figures, selected]);

    const value = useMemo<IContextData>((): IContextData => {
        return {
            figures,
            selected,
            peerId,
            connected,
            connectTo,
            setSelected,
            moveSelected
        };
    }, [figures, selected, peerId, connected, connectTo, setSelected, moveSelected]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
