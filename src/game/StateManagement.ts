import { getSpeed } from './config'

interface StateManagementType {
    _speed: number
}
export class StateManagement implements StateManagementType {
    currentConfig = getSpeed(JSON.parse(localStorage.getItem("configSingle") as string));
    _speed: number = 0;
    constructor() {
        this.initSpeed();
    }
    initSpeed() {
        this._speed = this.currentConfig.originSpeed;
    }
    speedUp() {
        this._speed = this._speed * this.currentConfig.speedFactor;
        if (this._speed < this.currentConfig.speedMin) {
            this._speed = this.currentConfig.speedMin;
        }
    }
    resetSpeed() {
        this.initSpeed();
    }
    updatedState() {
        // this.updatedState();
    }
    getSpeed() {
        return this._speed;
    }
    getCurrentConfig(){
        return this.currentConfig;
    }
}