export function copy(text: string): Promise<void> {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text).catch(() => {
            // TODO: show message for error
            return;
        });
    }

    return fallbackCopyTextToClipboard(text);
}

export function paste(): Promise<string> {
    if (navigator.clipboard) {
        return navigator.clipboard.readText().catch(() => {
            // TODO: show message for error
            return '';
        });
    }

    return pastFromBufferFallback();
}

async function fallbackCopyTextToClipboard(text: string): Promise<void> {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise<void>((resolve, reject) => {
        const successful = document.execCommand('copy');
        if (successful) {
            resolve(undefined);
        } else {
            reject();
        }
    }).finally(() => {
        document.body.removeChild(textArea);
    });
}

export function pastFromBufferFallback(): Promise<string> {
    const textArea = document.createElement('textarea');
    textArea.value = '';

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('paste');
    document.body.removeChild(textArea);
    return Promise.resolve(textArea.value);
}
