import { createContext, useMemo, useState } from 'react';
import { IFigure, IPosition, IProps } from './types';
import { generateFigures } from './helpers/generateFigures';
import { useService } from './hooks/useService';

interface IContextData {
    figures: IFigure[];
    selected: IPosition;
    peerId: string;
    connected: boolean;
    connectTo(peerId: string): void;
}

export const Context = createContext<IContextData>({} as IContextData);

export function Provider({ children }: IProps) {

    const [figures] = useState<IFigure[]>(generateFigures);
    const [selected] = useState<IPosition>({ x: 1, y: 1 });
    const { connectTo, send, peerId, connected } = useService();

    const value = useMemo<IContextData>((): IContextData => {
        return {
            figures,
            selected,
            peerId,
            connected,
            connectTo
        };
    }, [figures, selected, peerId, connected, connectTo]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
