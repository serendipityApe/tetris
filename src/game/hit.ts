import { BoxType } from "./box";
import { getBoxBottomPoints } from "./matrix";

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