import { KeyboardEvent, useCallback, useEffect, useRef } from 'react';
import '../styles/urlInputDialog.css';
import { IProps } from '../types';

interface IUrlInputDialog extends IProps {
    onInput?(url: string): void;
    onCancel?(): void;
}

export function UrlInputDialog({onInput, onCancel}: IUrlInputDialog) {

    const inputRef = useRef<HTMLInputElement>(null);
    const defaultValue = localStorage.getItem('cg-bot-text') || '';

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            const value = inputRef.current?.value || ''
            onInput?.(value);
            localStorage.setItem('cg-bot-text', value);
        } else if (event.code === 'Escape') {
            onCancel?.();
        }
    }, [onInput, onCancel]);

    return (
        <div className="cg-url-dialog-overlay" >
            <div id='cg-url-dialog' className='cg-url-dialog'>
                <input type="text" defaultValue={defaultValue} ref={inputRef} className='cg-url-dialog-input' onKeyDown={onKeyDown} />
            </div>
        </div>
    );
}
