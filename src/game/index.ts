import { initMap } from './map'
import { createBox } from "./box";
import render from "./render";

import intervalTimer from "./utils/intervalTimer";
import { hitBottomBorder, hitBottomBox } from "./hit";
import { addBoxtoMap, eliminateLine } from "./map";
import { addTicker } from './ticker';
export * from './config'

let _mapRef: React.MutableRefObject<number[][]>;
let _setMapRef: Function;
export function initGame(mapRef: React.MutableRefObject<number[][]>, setMapRef: Function) {
    initMap(setMapRef);
    _mapRef = mapRef;
    _setMapRef = setMapRef;
}

export function startGame() {
    initMap(_setMapRef);
    let activeBox = createBox();
    render(activeBox, _mapRef, _setMapRef);
    const isMoveDown = intervalTimer();
    function handlerTicker(n: number) {
        if (isMoveDown(n, 300)) {
            if (
                hitBottomBorder(activeBox, _mapRef.current) ||
                hitBottomBox(activeBox, _mapRef.current)
            ) {
                addBoxtoMap(activeBox, _mapRef, _setMapRef);
                eliminateLine(_mapRef, _setMapRef);
                activeBox = createBox();
                return;
            }
            activeBox.y++;
        }
        render(activeBox, _mapRef, _setMapRef);
    }

    window.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "ArrowDown":
                activeBox.y++;
                break;
            case "ArrowLeft":
                activeBox.x--;
                break;
            case "ArrowRight":
                activeBox.x++;
                break;
            case "ArrowUp":
                console.log(activeBox)
                activeBox.rotate();
                break;
            default: break;
        }
    });
    addTicker(handlerTicker);
}