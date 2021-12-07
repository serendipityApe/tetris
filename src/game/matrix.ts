
export function getBoxBottomPoints(matrix: number[][]) {
    let row = matrix.length - 1;
    const points: any[] = [];
    function getEffectiveLastRow(row: number) {
        matrix[row].forEach((v, j) => {
            if (matrix[row][j] > 0) {
                points.push({ x: j, y: row })
            }
        })
    }
    getEffectiveLastRow(row);
    //[1,1,1]
    //[1,0,0]
    //[0,0,0]  改行为无效行，要向上继续检测

    //如果最后一行为空，向上继续检测直到检测到有效行
    while (!points.length && --row >= 0) {
        getEffectiveLastRow(row);
    }
    return points;
}

export function getBoxLeftPoints(matrix: number[][]) {
    let col = 0;
    const points: any[] = [];
    function getEffectiveLastRow(col: number) {
        for (let j = 0; j < matrix[col].length - 1; j++) {
            if (matrix[col][j] > 0) {
                points.push({ x: col, y: j })
            }
        }
    }
    getEffectiveLastRow(col);
    //[1,1,1]
    //[1,0,0]
    //[0,0,0]  改行为无效行，要向上继续检测

    //如果最后一行为空，向上继续检测直到检测到有效行
    while (!points.length && col++ <= matrix.length - 1) {
        getEffectiveLastRow(col);
    }
    return points;
}
//逆时针旋转90度
export function rotate(matrix: number[][]) {
    let temp: Array<any> = [];
    const row = matrix.length;
    const col = matrix[0].length;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const newRow: number = row - 1 - j;

            if (!temp[newRow]) {
                temp[newRow] = [];
            }

            temp[newRow][i] = matrix[i][j];
        }
    }

    return temp;
}