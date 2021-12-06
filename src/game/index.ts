import { initMap } from './map'
import { createBoxByType } from './box';
import render from './render';
import { addTicker } from './ticker';
export * from './config'

export function startGame(map: number[][], setMap: React.Dispatch<React.SetStateAction<number[][]>>) {
    initMap(map, setMap);
    // let box = createBoxByType(1);
    // render(box, map, setMap);
    function handlerTicker() {
        console.log('1')
        // requestAnimationFrame(handlerTicker)
    }
    // addTicker(handlerTicker)
}