type configSingle = {
    difficulty: "common" | 'simple' | 'hard' | 'hardest';
    pattern: 'usually' | 'dj';
    theme: 'green' | 'blue' | 'yellow'
}

const defaultConfig: configSingle = {
    difficulty: "common",
    pattern: "usually",
    theme: 'green'
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
        speed: 500,
        speedFactor: 0.4,
        speedMin: 200,
        originSpeed: 800
    },
    hardest: {
        row: 10,
        col: 16,
        speed: 300,
        speedFactor: 0.4,
        speedMin: 50,
        originSpeed: 300
    }
}

export const themeConfig: { [key: string]: { [key: number]: string } } = {
    green: {
        0: "#CADCB6",
        1: "#1F8258",
        2: "#B2BF88",
        3: "#1E7870",
        4: "#218C47",
        [-1]: '#1E7870',
    },
    blue: {
        0: "#e0f1f4",
        1: "#88abda",
        2: "#3cbce5",
        3: "#8ec1ea",
        4: "#3bbee8",
        [-1]: '#2e59a7',
    },
    yellow: {
        // #ECD9C7
        0: "#DFD7C2",
        1: "#b37745",
        2: "#AA9649",
        3: "#9f5221",
        4: "#DA9233",
        [-1]: '#FDCF00',
    }
}
let curConfig: configSingle = JSON.parse(localStorage.getItem("configSingle") as string);

export let currentConfig = configGame[curConfig.difficulty]

export function resetSpeed() {
    currentConfig.speed = currentConfig.originSpeed;
}

export function updateState() {
    curConfig = JSON.parse(localStorage.getItem("configSingle") as string);
    currentConfig = configGame[curConfig.difficulty];
    resetSpeed();
}