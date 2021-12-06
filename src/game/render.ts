import { BoxType } from './box'
import deepClone from './utils/deepClone';
export default function render(box: BoxType, map: number[][], setMap: React.Dispatch<React.SetStateAction<number[][]>>) {
    reset(map, setMap);
    _render(box, map, setMap);
}

function _render(box: BoxType, map: number[][], setMap: React.Dispatch<React.SetStateAction<number[][]>>) {
    let _map:number[][] = deepClone(map);
    for (let i = 0; i < box.shape.length; i++) {
        for (let j = 0; j < box.shape[0].length; j++) {
            const row = i + box.y;
            const col = j + box.x;
            if (box.shape[i][j] > 0) {
                _map[row][col] = 1;
            }
        }
    }
    setMap(_map);
}

function reset(map: number[][], setMap: React.Dispatch<React.SetStateAction<number[][]>>) {
    let _map:number[][] = deepClone(map);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] > 0) {
                _map[i][j] = 0
            }
        }
    }
    setMap(_map);
}