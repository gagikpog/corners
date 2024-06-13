import { ChangeEvent, MouseEvent as ReactMouseEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import { Burger } from './icon/burger';
import { BoardRotate } from '../types';

export function Settings() {
    const [opened, setOpened] = useState(false);
    const { settings, setSettings, numberOfMoves, connected, setBoardRotate } = useContext(Context);

    const onOpen = useCallback(() => {
        setOpened((open) => !open);
    }, []);

    const changeSize = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const target = event.target;
        const [w, h] = target.value.split('x');
        setSettings({
            ...settings,
            itemsHight: Number(h),
            itemsWidth: Number(w)
        });
    }, [settings,setSettings]);

    const size = `${settings.itemsWidth}x${settings.itemsHight}`;

    const outsideClick = useCallback((event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.cg-settings')) {
            setOpened(false);
        }
    }, []);

    useEffect(() => {
        document.body.addEventListener('click', outsideClick)
        return () => document.body.removeEventListener('click', outsideClick);
    }, [outsideClick]);

    const rotateBoard = useCallback((event: ReactMouseEvent) => {
        event.preventDefault();
        setBoardRotate((value: BoardRotate) => value === BoardRotate.Rotated ? BoardRotate.Default: BoardRotate.Rotated);
    }, [setBoardRotate])

    return (
        <div className="cg-settings">
            <div className={`cg-settings-panel ${ opened ? 'cg-settings-panel-opened' : ''}`}>
                <div className="cg-settings-panel-content">
                    <div>Size</div>
                    <select onChange={changeSize} value={size} disabled={!!numberOfMoves || !connected}>
                        <option value="3x3">3x3</option>
                        <option value="4x3">4x3</option>
                        <option value="3x4">3x4</option>
                        <option value="4x4">4x4</option>
                    </select>
                    <div className='cg-settings-col-2'>
                        <a onClick={rotateBoard} href="/" >Rotate desk</a>
                    </div>
                </div>
            </div>
            <Burger className={`cg-burger ${ opened ? 'cg-burger-opened' : '' }`} onClick={onOpen}/>
        </div>
    );
}
