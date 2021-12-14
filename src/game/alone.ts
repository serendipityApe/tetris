import { randomCreateBox } from "./box";
import { Game } from "./game";
import isMobile from './utils/checkServices'
import { beginDJ, getState } from "./utils/frenzyDj.js";
export class Alone {
    private _game: Game;
    constructor(game: Game) {
        this._game = game;
        this._game.setCreateBoxStrategy(this.createBoxStrategy.bind(this));
        this._game._emitter.on('gameover', this.gameLose.bind(this));
        let configSingle = JSON.parse(localStorage.getItem('configSingle') as string);
        if (configSingle.pattern === 'dj') {
            this._game._emitter.on('eliminateLine', this.DJ)
        }
        if (isMobile()) {

        } else {
            window.onkeydown = this.handlerKeyDown.bind(this)
        }
        // window.addEventListener('keydown', this.handlerKeyDown.bind(this))
    }
    createBoxStrategy() {
        const box = randomCreateBox();
        return box;
    }
    DJ() {
        if (!getState()) {
            beginDJ();
        }
    }
    gameLose() {
        alert('游戏结束');
        window.location.replace('/')
        // this._game.endGame();
        // gameoverAll();
        // getGameoverHandler()();
    }
    start() {
        this._game.start();
    }
    //在index.ts里导出该函数，在Game组件里绑定
    handlerButton(order: string) {
        switch (order) {
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