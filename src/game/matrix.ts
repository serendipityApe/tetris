
export function getBoxBottomPoints(matrix: number[][]) {
    //[1,1,1]
    //[1,0,0]
    //[0,0,0]  获取宏观上的所有底部点，即 [{x:0,y:1},{x:1,y:0},{x:2,y:0}]
    let row = matrix.length - 1;
    const points: any[] = [];
    let flag = new Map<number, boolean>();
    function getEffectiveLastRow(row: number) {
        matrix[row].forEach((v, j) => {
            if (matrix[row][j] > 0) {
                if (!flag.has(j)) {
                    flag.set(j, true);
                    points.push({ x: j, y: row })
                }
            }
        })
    }
    getEffectiveLastRow(row);
    //如果点未获取完，向上继续检测直到获取所有点
    while (points.length < matrix[0].length && --row >= 0) {
        getEffectiveLastRow(row);
    }
    return points;
}
export function getBoxLeftPoints(matrix: number[][]) {
    //[0,1,1]
    //[1,1,0]
    //  获取左边届的点，即 [{x:0,y:1},{x:1,y:0}]
    let col = 0;
    const points: any[] = [];
    let flag = new Map<number, boolean>();
    function getEffectiveLastRow(col: number) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][col] > 0) {
                if (!flag.has(i)) { 
                    flag.set(i, true)
                    points.push({ x: col, y: i })
                }
            }
        }
    }
    getEffectiveLastRow(col);
    while (points.length < matrix.length && ++col <= matrix.length - 1) {
        getEffectiveLastRow(col);
    }
    return points;
}
export function getBoxRightPoints(matrix: number[][]) {
    let col = matrix.length - 1;
    const points: any[] = [];
    let flag = new Map<number, boolean>();
    function getEffectiveLastRow(col: number) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][col] > 0) {
                if (!flag.has(i)) {
                    flag.set(i, true)
                    points.push({ x: col, y: i })
                }
            }
        }
    }
    getEffectiveLastRow(col);
    while (points.length < matrix.length && --col >= 0) {
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

//算法可优化?
export function getBoxLeftPoints2(matrix: number[][]) {
    const points: any[] = [];
    function getEffectiveLastRow() {
        for (let i = 0; i < matrix.length; i++) {
            if (points.length < matrix.length) {
                for (let j = 0; j < matrix[0].length; j++) {
                    if (matrix[i][j] > 0) {
                        points.push({ x: j, y: i });
                        break;
                    }
                }
            } else {
                break;
            }
        }
    }
    getEffectiveLastRow();
    return points;
}