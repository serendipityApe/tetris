type configSingle = {
    difficulty: "common" | 'simple' | 'hard' | 'hardest';
    pattern: 'usually' | 'dj'
}

const defaultConfig: configSingle = {
    difficulty: "common",
    pattern: "usually",
};

function setDefaultConfig() {
    if (!localStorage.getItem('configSingle')) {
        localStorage.setItem("configSingle", JSON.stringify(defaultConfig));
    }
}
setDefaultConfig();   //在game/index.ts中引入，总会在开始时执行

//游戏配置项
export const gameRow = 10;
export const gameCol = 16;

export const moveDownTimeInterval = 300



export const configGame = {
    simple: {
        row: 10,
        col: 16,
        speed: 1500,
        speedFactor: 0.8,
        speedMin: 500,
        originSpeed: 1500
    },
    common: {
        row: 10,
        col: 16,
        speed: 1000,
        speedFactor: 0.6,
        speedMin: 300,
        originSpeed: 1000
    },
    hard: {
        row: 10,
        col: 16,
        speed: 800,
        speedFactor: 0.4,
        speedMin: 200,
        originSpeed: 800
    },
    hardest: {
        row: 10,
        col: 16,
        speed: 500,
        speedFactor: 0.4,
        speedMin: 50,
        originSpeed: 500
    }
}
const curConfig: configSingle = JSON.parse(localStorage.getItem("configSingle") as string);

export const currentConfig = configGame[curConfig.difficulty]

export function resetSpeed() {
    currentConfig.speed = currentConfig.originSpeed;
}