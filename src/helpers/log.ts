import { MessageType } from '../types';

export function logging(message: string, type: MessageType): void {
    fetch('https://gagikpog-api.ru/logging/add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ app: 'corners', message, type, user: 'gagikpog' }),
    }).then((res) => {
        return res.json();
    }).catch(() => {
        console.error('log save error');
    });
}

window.onerror = function(error, url, line){
    logging(String(error), MessageType.Error);
};
