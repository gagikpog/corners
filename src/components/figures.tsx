import { useContext } from 'react';
import { Context } from '../context';
import { Figure } from './figure';

export function Figures() {

    const {figures, selected} = useContext(Context);

    return (
        <>
            {
                figures.map((figure, index) => {
                    const styles = {
                        '--left': figure.x,
                        '--top': figure.y
                    } as React.CSSProperties;
                    return (
                        <div key={index} className={`figure`} style={ styles }>
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
