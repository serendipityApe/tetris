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
//使用策略模式控制box旋转方案
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

//使用工厂模式创建Box
export function createBox() {
    const { shape, type } = getRandomBoxInfo();
    const box = new Box(type);
    box.shape = shape;
    return box;
}
export function createBoxByType(type: number) {
    const box = new Box(type);
    const { shape } = boxInfos[type];

    box.shape = shape;

    return box;
}
function getRandomBoxInfo(){
    const max = Object.keys(boxInfos).length;
    const type = Math.floor(Math.random() * max + 1);
    return boxInfos[type];
}