import { createContext, useMemo, useState } from 'react';
import { IFigure, IProps } from './types';
import { generateFigures } from './helpers/generateFigures';

interface IContextData {
    figures: IFigure[]
}

export const Context = createContext<IContextData>({} as IContextData);

export function Provider({ children }: IProps) {

    const [figures] = useState<IFigure[]>(generateFigures);

    const value = useMemo<IContextData>((): IContextData => {
        return {
            figures
        };
    }, [figures]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
