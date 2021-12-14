import { currentConfig } from './config'

interface StateManagementType {
    _speed: number
}
export class StateManagement implements StateManagementType {
    _speed: number = 0;
    constructor() {
        this.initSpeed();
    }
    initSpeed() {
        this._speed = currentConfig.originSpeed;
    }
    speedUp() {
        this._speed = this._speed * currentConfig.speedFactor;
        if (this._speed < currentConfig.speedMin) {
            this._speed = currentConfig.speedMin;
        }
    }
    resetSpeed() {
        this.initSpeed();
    }
    updatedState() {
        this.updatedState();
    }
    getSpeed() {
        return this._speed;
    }
}