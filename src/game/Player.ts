import { createBox } from "./box";
import { Game, moveDownTimeInterval } from "./game";
import { addTicker } from "./ticker";
import intervalTimer from "./utils/intervalTimer";

export class Player {
    private _game: Game;
    constructor(game: Game) {
        this._game = game;
        this._game.setCreateBoxStrategy(this.createBoxStrategy.bind(this));
        window.addEventListener('keydown', this.handlerKeyDown.bind(this))
    }
    createBoxStrategy() {
        const box = createBox();
        return box;
    }
    start() {
        addTicker(this.handleBoxMoveDown.bind(this));
    }
    _isDown = intervalTimer(moveDownTimeInterval);
    handleBoxMoveDown(n: number) {
        if (!this._game) return;
        if (this._isDown(n)) {
            this._game.moveBoxToDown();
        }
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