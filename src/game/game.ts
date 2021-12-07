import { BoxType, createBox } from "./box";
import render from "./render";

import { hitBottomBorder, hitBottomBox, hitLeftBoxAndBorder } from "./hit";
import { addBoxtoMap, eliminateLine } from "./map";
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
            this._activeBox = createBox();
            return;
        }
        this._activeBox.y++;
    }
    moveBoxToLeft() {
        if (hitLeftBoxAndBorder(this._activeBox, this._mapRef.current)) {
            return;
        }
        this._activeBox.x--;
        //检查左侧碰撞
    }
    moveBoxToRight() {
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