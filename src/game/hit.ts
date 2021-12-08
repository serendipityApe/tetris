import { BoxType } from "./box";
import { getBoxBottomPoints, getBoxLeftPoints, getBoxRightPoints } from "./matrix";

export function hitBottomBorder(box: BoxType, map: number[][]) {
    const points = getBoxBottomPoints(box.shape);
    const gameRow = map.length;
    for (let i = 0; i < points.length; i++) {
        if (points[i].y + 1 + box.y >= gameRow) {
            return true;
        }
        return false;
    }
}

export function hitBottomBox(box: BoxType, map: number[][]) {
    const points = getBoxBottomPoints(box.shape);

    return points.some((point) => {
        // 看看 这个位置上 在 map 里面 是不是有 其他的 box 的

        const col = point.x + box.x;
        const row = point.y + box.y + 1;

        return map[row][col] < 0;
    });
}
// export function hitLeftBorder(box: BoxType, map: number[][]) {
//     const points = getBoxLeftPoints(box.shape);
//     return points.some((point) => {
//         return point.x + box.x <= 0
//     })
// }

export function hitLeftBoxAndBorder(box: BoxType, map: number[][]) {
    const points = getBoxLeftPoints(box.shape);
    return points.some((point) => {
        const col = point.x + box.x;
        const row = point.y + box.y;
        return col <= 0 || map[row][col - 1] < 0;
    })
}

export function hitRightBoxAndBorder(box: BoxType, map: number[][]) {
    const points = getBoxRightPoints(box.shape);
    return points.some((point) => {
        const col = point.x + box.x;
        const row = point.y + box.y;
        return col >= map[0].length - 1 || map[row][col + 1] < 0;
    })
}

export function isBoxOverFlow(map: number[][]) {
    const row = 0;
    return map[row].some((point) => {
        return point < 0
    })
}
export function isIllegalBoxInMap(box: BoxType, map: number[][]) {
    const shape = box.shape;
    const row = shape.length;
    const col = shape[0].length;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const xx = box.x + j;
            const yy = box.y + i;
            if (map[yy][xx] < 0) {
                return true;
            }
        }
    }

    return false;
}