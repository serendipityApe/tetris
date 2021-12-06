import { gameRow } from ".";
import { BoxType } from "./box";
import { getBoxBottomPoints } from "./matrix";

export function hitBottomBorder(box: BoxType, map: number[][]) {
    const points = getBoxBottomPoints(box.shape);

    for (let i = 0; i < points.length; i++) {
        if (points[i].y + 1 + box.y >= gameRow) {
            return true;
        }
        return false;
    }
}