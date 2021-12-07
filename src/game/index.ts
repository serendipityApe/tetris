import { initMap } from './map'
import { createBox } from "./box";
import { addTicker } from './ticker';
import { Game } from './game';
import { Player } from './Player';
export * from './config'

let selfGame: Game;
let player: Player;
export function initSelfGame(mapRef: React.MutableRefObject<number[][]>, setMapRef: Function) {
    const box = createBox();
    initMap(setMapRef);
    selfGame = new Game(box, mapRef, setMapRef);
    player = new Player(selfGame);
}

let isStarted = false;
export function startGame() {
    isStarted = true;
    player.start();
}

//主循环
addTicker(() => {
    if (!isStarted) return;
    selfGame.render();
    // rivalGame.render();
});