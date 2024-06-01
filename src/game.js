import { Figure } from './figure.js';

export class Game {

    #figures = [];

    constructor() {
        this.#createFigures();
    }

    #createFigures() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.#figures.push(new Figure({x: i, y: j, color: 'white', owner: true})); 
            }
        }

        for (let i = 5; i < 8; i++) {
            for (let j = 5; j < 8; j++) {
                this.#figures.push(new Figure({x: i, y: j, color: 'black', owner: false})); 
            }
        }
    }
}
