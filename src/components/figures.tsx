import { useContext } from 'react';
import { Context } from '../context';

export function Figures() {

    const {figures} = useContext(Context);

    return (
        <>
            {
                figures.map((figure, index) => {
                    const styles = {
                        '--left': figure.x,
                        '--top': figure.y
                    } as React.CSSProperties;
                    return <div key={index} className={`figure ${figure.color}`} style={ styles }></div> 
                })
            }
        </>
    );
}
