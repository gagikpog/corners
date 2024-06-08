import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import { Burger } from './icon/burger';

export function Settings() {
    const [opened, setOpened] = useState(false)
    const { settings, setSettings, numberOfMoves } = useContext(Context);

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
        console.log(target.value);
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
    }, [outsideClick])

    return (
        <div className="cg-settings">
            <div className={`cg-settings-panel ${ opened ? 'cg-settings-panel-opened' : ''}`}>
                <div className="cg-settings-panel-content">
                    <div>Size</div>
                    <select onChange={changeSize} value={size} disabled={!!numberOfMoves}>
                        <option value="3x3">3x3</option>
                        <option value="4x3">4x3</option>
                        <option value="4x4">4x4</option>
                    </select>
                </div>
            </div>
            <Burger className={`cg-burger ${ opened ? 'cg-burger-opened' : '' }`} onClick={onOpen}/>
        </div>
    );
}
