export interface BoxType {
    x: number;
    y: number;
    shape: number[][];
    type: number;
}
export class Box implements BoxType {
    x: number;
    y: number;
    shape: number[][];
    type: number;
    constructor(type = 0) {
        this.x = 0;
        this.y = 0;
        this.type = type;
        this.shape = [
            [1, 1],
            [1, 1],
        ];
    }
}
const boxInfos: { [key: number]: { type: number; shape: number[][] } } = {
    1: {
        type: 1,
        shape: [
            [1, 1],
            [1, 1],
        ],
    },

    2: {
        type: 2,
        shape: [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
        ],
    },
    3: {
        type: 3,
        shape: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
        ],
    },
};
export function createBoxByType(type: number) {
    const box = new Box(type);
    const { shape } = boxInfos[type];

    box.shape = shape;

    return box;
}