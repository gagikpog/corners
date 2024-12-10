const src = 'https://mc.yandex.ru/metrika/tag.js';

export function initYM() {
    window.ym = window.ym || function () { ( window.ym.a = window.ym.a || [] ).push(arguments) };
    window.ym.l = 1 * (new Date() as unknown as number);
    for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === src) {
            return;
        }
    }
    const script = document.createElement('script');
    const a = document.getElementsByTagName('script')[0];
    script.async = true;
    script.src = src;
    a.parentNode?.insertBefore(script, a);

    window.ym(99175472, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    });
};
