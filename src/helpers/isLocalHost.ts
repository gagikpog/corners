export function isLocalHost(): boolean {
    return (window.location.hostname === 'localhost' || /^(\d{0,3}\.){3}\d{0,3}$/.test(window.location.hostname));
}
