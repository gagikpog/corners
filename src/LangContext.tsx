import React from 'react';
import { LangMap, Langs } from './lang';

interface IContextValue {
    tr: (str: keyof typeof LangMap.ru) => string;
}

class Tr implements IContextValue {
    private _curLang: Langs;
    constructor() {
        this._curLang = document.documentElement.lang as Langs;
    }

    tr = (str: keyof typeof LangMap.ru) => {
        return LangMap[this._curLang][str] || str;
    }
}

export const translation = new Tr();

export const LangContext = React.createContext(translation);

export const LangContextProvider = ({children}: { children: JSX.Element }) => {
    return (
        <LangContext.Provider value={translation}>
            { children }
        </LangContext.Provider>
    );
}
