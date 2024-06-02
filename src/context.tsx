import { createContext, useMemo, useState } from 'react';
import { IFigure, IPosition, IProps } from './types';
import { generateFigures } from './helpers/generateFigures';

interface IContextData {
    figures: IFigure[];
    selected: IPosition;
}

export const Context = createContext<IContextData>({} as IContextData);

export function Provider({ children }: IProps) {

    const [figures] = useState<IFigure[]>(generateFigures);
    const [selected] = useState<IPosition>({ x: -1, y: -1 });

    const value = useMemo<IContextData>((): IContextData => {
        return {
            figures,
            selected
        };
    }, [figures, selected]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
