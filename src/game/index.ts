import { initMap } from './map'
import { randomCreateBox } from "./box";
import { Game } from './game';
import { Player } from './Player';
export * from './config'

let selfGame: Game;
let player: Player;
export function initSelfGame(mapRef: React.MutableRefObject<number[][]>, setMapRef: Function) {
    const box = randomCreateBox();
    initMap(setMapRef);
    selfGame = new Game(box, mapRef, setMapRef);
    player = new Player(selfGame);
}

// let isStarted = false;
export function startGame() {
    // isStarted = true;
    player.start();
}
export function operateInMobile(order: string) {
    player.handlerButton(order)
}
let _gameoverHandler: Function;
export function setGameoverHandler(fn: Function) {
    _gameoverHandler = fn;
}
export function getGameoverHandler() {
    return _gameoverHandler;
}

export function forceOverSelfGame() {
    selfGame.forceOverGame();
}