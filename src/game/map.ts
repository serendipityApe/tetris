import { gameCol, gameRow } from ".";
import { BoxType } from "./box";
import deepClone from "./utils/deepClone";

//初始化map
export function initMap(setMapRef: Function) {
    let _map = [];
    for (let i = 0; i < gameCol; i++) {
        const arr: Array<number> = [];
        for (let j = 0; j < gameRow; j++) {
            arr.push(0);
        }
        _map.push(arr);
    }
    setMapRef(_map);
    // setMap(_map);
}

export function addBoxtoMap(box: BoxType, map: React.MutableRefObject<number[][]>, setMapRef: Function) {
    let _map: number[][] = deepClone(map.current);
    for (let i = 0; i < box.shape.length; i++) {
        for (let j = 0; j < box.shape[0].length; j++) {
            const x = box.x + j;
            const y = box.y + i;
            if(_map[y][x] > 0){
                _map[y][x] = -1;
            }
        }
    }
    setMapRef(_map);
}
export function eliminateLine(map: React.MutableRefObject<number[][]>, setMapRef: Function) {
    let _map: number[][] = deepClone(map.current);
    let lines: Array<number> = [];
    for (let i = 0; i < _map.length; i++) {
        const arr = _map[i];

        const boo = arr.every((v) => {
            return v === -1;
        });

        if (boo) {
            lines.push(i);
        }
    }
    const mapCol = _map[0].length;

    lines.forEach((n) => {
        _map.splice(n, 1);
        // 补上新的行
        _map.unshift(new Array(mapCol).fill(0));
    });
    setMapRef(_map);
}