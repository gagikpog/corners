export class Figure {
    x;
    y;
    owner;
    #node;

    constructor({ x, y, owner, color }) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.#node = document.createElement('div');
        this.#node.classList.add('figure', color);
        this.#node.style.setProperty('--top', this.y);
        this.#node.style.setProperty('--left', this.x);
        const root = document.querySelector('#game');
        root?.appendChild(this.#node);
    }
}
