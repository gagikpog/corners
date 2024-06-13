import { useCallback, useContext } from 'react';
import { Context } from '../context';
import { Figure } from './figure';
import { IFigure } from '../types';
import { EMPTY_POSITION } from '../constants';
import { Crown } from './icon/crown';

export function Figures() {

    const {figures, selected, activePlayer, botUrl, setSelected, connected} = useContext(Context);

    const figureClickHandler = useCallback((figure: IFigure) => {
        const canSelect = figure.owner;
        setSelected(canSelect && activePlayer && !botUrl ? { x: figure.x, y: figure.y } : EMPTY_POSITION);
    }, [setSelected, activePlayer, botUrl]);

    return (
        <>
            {
                figures.map((figure, index) => {
                    const styles = {
                        '--left': figure.x,
                        '--top': figure.y
                    } as React.CSSProperties;
                    return (
                        <div key={index} className={`cg-figure`} style={ styles } onClick={() => figureClickHandler(figure)} id={figure.id}>
                            <Figure
                                color={figure.color}
                                selected={selected.x === figure.x && selected.y === figure.y }
                            />
                            {
                                figure.owner && connected ? <Crown className='cg-figure-crown' color={figure.color}/> : null
                            }
                        </div>
                    );
                })
            }
        </>
    );
}
