import { initMap } from './map'
import { createBoxByType } from './box';
import render from './render';
import { addTicker } from './ticker';
export * from './config'

export function startGame(map: number[][], setMap: Function) {
    initMap(map, setMap);
}