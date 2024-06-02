export function generateUrl(peerId: string): string {
    return `${document.location.origin}/${peerId}`;
}

export function getPeerIdFromUrl(): string {
    return getPeerId(document.location.pathname);
}

export function getPeerId(text: string): string {
    const [, peerId] = text.match(/\/(\w{8}(-\w{4}){3}-\w{12})/) || [];
    return peerId || '';
}
