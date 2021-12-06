import { BoxType } from "./box";

export function getBoxBottomPoints(matrix: number[][]) {
    const row = matrix.length;
    const points: any[] = [];
    matrix[row - 1].forEach((v, j) => {
        if (matrix[row - 1][j] > 0) {
            points.push({ x: j, y: row - 1 })
        }
    })
    return points;
}