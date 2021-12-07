import { BoxType, createBox } from "./box";
import render from "./render";

import { hitBottomBorder, hitBottomBox, hitLeftBoxAndBorder, hitRightBoxAndBorder, isBoxOverFlow } from "./hit";
import { addBoxtoMap, eliminateLine } from "./map";
import intervalTimer from "./utils/intervalTimer";
import { moveDownTimeInterval } from ".";
import { addTicker, removeTicker } from "./ticker";
export * from './config'

export class Game {
    private _mapRef: React.MutableRefObject<number[][]>;
    private _setMapRef: Function;
    private _activeBox: BoxType;
    private _createBoxStrategy: any;
    constructor(box: BoxType, mapRef: React.MutableRefObject<number[][]>, setMapRef: Function) {
        this._mapRef = mapRef;
        this._activeBox = box;
        this._setMapRef = setMapRef;
    }
    start() {
        addTicker(this.handleTicker, this);
    }
    //游戏开始每帧执行的函数，包括box向下移动与render;
    handleTicker(i: number) {
        console.log('执行')
        this.handleBoxMoveDown(i);
        render(this._activeBox, this._mapRef, this._setMapRef)
    }
    _isDown = intervalTimer(moveDownTimeInterval);
    handleBoxMoveDown(n: number) {
        // if (!this._game) return;
        if (this._isDown(n)) {
            this.moveBoxToDown();
        }
    }
    render() {
        render(this._activeBox, this._mapRef, this._setMapRef);
    }
    moveBoxToDown() {
        if (
            hitBottomBorder(this._activeBox, this._mapRef.current) ||
            hitBottomBox(this._activeBox, this._mapRef.current)
        ) {
            addBoxtoMap(this._activeBox, this._mapRef, this._setMapRef);
            eliminateLine(this._mapRef, this._setMapRef);
            if (isBoxOverFlow(this._mapRef.current)) {
                removeTicker(this.handleTicker, this);
                alert('游戏结束');
                return;
            }
            this._activeBox = createBox();
            return;
        }
        this._activeBox.y++;
    }
    moveBoxToLeft() {
        //检查左侧碰撞
        if (hitLeftBoxAndBorder(this._activeBox, this._mapRef.current)) return;
        this._activeBox.x--;
    }
    moveBoxToRight() {
        if (hitRightBoxAndBorder(this._activeBox, this._mapRef.current)) return;
        this._activeBox.x++;
    }
    rotateBox() {
        this._activeBox.rotate();
    }
    setBox(box: BoxType) {
        this._activeBox = box;
    }
    setCreateBoxStrategy(strategy: any) {
        this._createBoxStrategy = strategy;
    }
}