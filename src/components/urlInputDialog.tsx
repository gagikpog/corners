import { KeyboardEvent, useCallback, useEffect, useRef } from 'react';
import '../styles/urlInputDialog.css';
import { IProps } from '../types';

interface IUrlInputDialog extends IProps {
    onInput?(url: string): void;
    onCancel?(): void;
}

export function UrlInputDialog({onInput, onCancel}: IUrlInputDialog) {

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            onInput?.(inputRef.current?.value || '');
        } else if (event.code === 'Escape') {
            onCancel?.();
        }
    }, [onInput, onCancel]);

    return (
        <div className="cg-url-dialog-overlay" >
            <div id='cg-url-dialog' className='cg-url-dialog'>
                <input type="text" ref={inputRef} className='cg-url-dialog-input' onKeyDown={onKeyDown} />
            </div>
        </div>
    );
}
