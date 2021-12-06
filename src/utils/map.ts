import { gameCol, gameRow } from "../utils";


export function initMap(map: number[][], setMap: React.Dispatch<React.SetStateAction<number[][]>>) {
    let _map = [];
    for (let i = 0; i < gameCol; i++) {
        const arr: Array<number> = [];
        for (let j = 0; j < gameRow; j++) {
            arr.push(0);
        }
        _map.push(arr);
    }
    setMap(_map);
}