export function copy(text: string): Promise<void> {
    return navigator.clipboard.writeText(text).catch(() => {
        // TODO: show message for error
        return;
    });
}

export function paste(): Promise<string> {
    return navigator.clipboard.readText().catch(() => {
        // TODO: show message for error
        return '';
    });
}
