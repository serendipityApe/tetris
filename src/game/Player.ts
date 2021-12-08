import { randomCreateBox } from "./box";
import { Game } from "./game";

export class Player {
    private _game: Game;
    constructor(game: Game) {
        this._game = game;
        this._game.setCreateBoxStrategy(this.createBoxStrategy.bind(this));
        // window.addEventListener('keydown', this.handlerKeyDown.bind(this))
        window.onkeydown = this.handlerKeyDown.bind(this)
    }
    createBoxStrategy() {
        const box = randomCreateBox();
        return box;
    }
    start() {
        this._game.start();
    }

    handlerKeyDown(e: KeyboardEvent) {
        switch (e.code) {
            case "ArrowDown":
                this._game.moveBoxToDown();
                break;
            case "ArrowLeft":
                this._game.moveBoxToLeft();
                break;
            case "ArrowRight":
                this._game.moveBoxToRight();
                break;
            case "ArrowUp":
                this._game.rotateBox();
                break;
            default: break;
        }
    }
}