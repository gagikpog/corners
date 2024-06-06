import { useCallback, useContext } from 'react';
import { Context } from '../context';
import { Figure } from './figure';
import { IFigure } from '../types';
import { EMPTY_POSITION } from '../constants';

export function Figures() {

    const {figures, selected, activePlayer, setSelected} = useContext(Context);

    const figureClickHandler = useCallback((figure: IFigure) => {
        const canSelect = figure.owner;
        setSelected(canSelect && activePlayer ? { x: figure.x, y: figure.y } : EMPTY_POSITION);
    }, [setSelected, activePlayer]);

    return (
        <>
            {
                figures.map((figure, index) => {
                    const styles = {
                        '--left': figure.x,
                        '--top': figure.y
                    } as React.CSSProperties;
                    return (
                        <div key={index} className={`figure`} style={ styles } onClick={() => figureClickHandler(figure)} id={figure.id}>
                            <Figure
                                color={figure.color}
                                selected={selected.x === figure.x && selected.y === figure.y }
                            />
                        </div>
                    );
                })
            }
        </>
    );
}
