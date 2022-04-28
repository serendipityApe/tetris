import { BoxType } from './box'
import deepClone from './utils/deepClone';
export default function render(box: BoxType, map: React.MutableRefObject<number[][]>, setMap: Function) {
    _render(box, map, setMap);
}

function _render(box: BoxType, map: React.MutableRefObject<number[][]>, setMap: Function) {
    let _map: number[][] = deepClone(map.current);
    //clear the activeBox of the previous map
    for (let i = 0; i < map.current.length; i++) {
        for (let j = 0; j < map.current[0].length; j++) {
            if (map.current[i][j] > 0) {
                _map[i][j] = 0
            }
        }
    }
    //render the currently activeBox on the map
    for (let i = 0; i < box.shape.length; i++) {
        for (let j = 0; j < box.shape[0].length; j++) {
            const row = i + box.y;
            const col = j + box.x;
            if (box.shape[i][j] > 0) {
                _map[row][col] = box.type;
            }
        }
    }
    setMap(_map);
}