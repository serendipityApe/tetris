import { BoxType, createBox } from "./box";
import render from "./render";

import { hitBottomBorder, hitBottomBox, hitLeftBoxAndBorder, hitRightBoxAndBorder, isBoxOverFlow, isIllegalBoxInMap } from "./hit";
import { addBoxtoMap, eliminateLine, isEliminateLine } from "./map";
import intervalTimer from "./utils/intervalTimer";
import { moveDownTimeInterval } from ".";
import { addTicker, removeTicker } from "./ticker";
import mitt from "mitt";
import deepClone from "./utils/deepClone";
export * from './config'

export class Game {
    private _mapRef: React.MutableRefObject<number[][]>;
    private _setMapRef: Function;
    private _activeBox: any; // -> boxtype
    private _createBoxStrategy: any;
    constructor(mapRef: React.MutableRefObject<number[][]>, setMapRef: Function) {
        this._mapRef = mapRef;
        // this._activeBox = box;
        this._setMapRef = setMapRef;
    }
    start() {
        this.addBox();
        addTicker(this.handleTicker, this);
    }
    //游戏开始每帧执行的函数，包括box向下移动与render;
    handleTicker(i: number) {
        this.handleBoxMoveDown(i);
        render(this._activeBox, this._mapRef, this._setMapRef)
    }
    _isDown = intervalTimer(moveDownTimeInterval);
    _isAutoDown = true;
    handleBoxMoveDown(n: number) {
        // if (!this._game) return;
        if (this._isAutoDown) {
            if (this._isDown(n)) {
                this.moveBoxToDown();
                // message.emit('moveBoxToDown')
                this._emitter.emit('moveBoxToDown')
            }
        }
    }
    render() {
        render(this._activeBox, this._mapRef, this._setMapRef);
    }
    _emitter = mitt();
    moveBoxToDown() {
        if (
            hitBottomBorder(this._activeBox, this._mapRef.current) ||
            hitBottomBox(this._activeBox, this._mapRef.current)
        ) {
            addBoxtoMap(this._activeBox, this._mapRef, this._setMapRef);
            let lines = isEliminateLine(this._mapRef);
            if (lines.length) {
                eliminateLine(this._mapRef, this._setMapRef, lines);
                this._emitter.emit('eliminateLine', lines.length)
            }
            if (isBoxOverFlow(this._mapRef.current)) {
                removeTicker(this.handleTicker, this);
                this._emitter.emit('gameover');
                return;
            }
            // this._activeBox = randomCreateBox();
            // console.log('创建')
            this.addBox();
            return;
        }
        this._activeBox.y++;
    }
    addBox() {
        this._activeBox = this._createBoxStrategy();
    }
    addLine(): number {
        let _map: number[][] = deepClone(this._mapRef.current);
        const row = _map[0].length;
        let line = new Array(row).fill(-1);
        let randomBlank =Math.floor(Math.random() * row);
        line[randomBlank] = 0;
        _map.shift();
        _map.push(line);
        this._setMapRef(_map);
        console.log(randomBlank + 'randomBlank')
        return randomBlank
    }
    syncAddLine(appointed:number){
        let _map: number[][] = deepClone(this._mapRef.current);
        const row = _map[0].length;
        let line = new Array(row).fill(-1);
        line[appointed] = 0;
        _map.shift();
        _map.push(line);
        this._setMapRef(_map);
        console.log(appointed + 'appointed')
        return appointed
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
        const boxInAdvance = createBox({
            x: this._activeBox.x,
            y: this._activeBox.y,
            shape: this._activeBox.getNextRotateShapeInAdvance(),
        });
        //检测box是否可以旋转
        if (isIllegalBoxInMap(boxInAdvance, this._mapRef.current)) return;
        this._activeBox.rotate(boxInAdvance.shape);
    }
    setBox(box: BoxType) {
        this._activeBox = box;
    }
    setCreateBoxStrategy(strategy: any) {
        this._createBoxStrategy = strategy;
    }
    endGame() {
        removeTicker(this.handleTicker, this);
        this._emitter.all.clear();
    }
    forceOverGame() {
        alert('游戏关闭');
        window.location.replace('/')
        // removeTicker(this.handleTicker, this);
        // this._emitter.all.clear();
        // getGameoverHandler()();
    }
}