import React, { useState, useEffect } from "react";
import { startGame } from "../game";
import { Block } from "./block";
import useUpdate from "../myHooks/useUpdate";
import { createBoxByType } from "../game/box";
import render from "../game/render";

import { addTicker } from "../game/ticker";
import intervalTimer from "../game/utils/intervalTimer";
import { hitBottomBorder } from "../game/hit";
import deepClone from "../game/utils/deepClone";
interface Props {}
const Game: React.FC<Props> = (props) => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const mapRef = React.useRef<number[][]>([]);
  const [map, setMap] = useState<number[][]>(mapRef.current);

  const setMapRef = (_map: number[][]) => {
    mapRef.current = _map;
    setMap(mapRef.current);
  };
  useEffect(() => {
    // startGame(map, setMap);
    startGame(mapRef.current, setMapRef);
    // eslint-disable-next-line
    setIsStarted(true);
  }, []);
  useUpdate(() => {
    let activeBox = createBoxByType(1);
    render(activeBox, mapRef, setMapRef);
    const isMoveDown = intervalTimer();
    function handlerTicker(n: number) {
      if (isMoveDown(n, 300)) {
        if (hitBottomBorder(activeBox, mapRef.current)) {
          let _map: number[][] = deepClone(map);
          for (let i = 0; i < activeBox.shape.length; i++) {
            for (let j = 0; j < activeBox.shape[0].length; j++) {
              const x = activeBox.x + j;
              const y = activeBox.y + i;
              _map[y][x] = -1;
            }
          }
          setMapRef(_map);
          activeBox = createBoxByType(1);
          return;
        }
        activeBox.y++;
      }
      render(activeBox, mapRef, setMapRef);
    }

    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowDown") {
        if (hitBottomBorder(activeBox, mapRef.current)) {
          let _map: number[][] = deepClone(map);
          for (let i = 0; i < activeBox.shape.length; i++) {
            for (let j = 0; j < activeBox.shape[0].length; j++) {
              const x = activeBox.x + j;
              const y = activeBox.y + i;
              _map[y][x] = -1;
            }
          }
          setMapRef(_map);
          activeBox = createBoxByType(1);
          return;
        }
        activeBox.y++;
      }
    });
    addTicker(handlerTicker);
  }, [isStarted]);
  return (
    <div>
      {mapRef.current.map((item, i) => {
        return (
          <div style={{ display: "flex" }} key={i}>
            {item.map((item2, j) => {
              return (
                <div key={j}>
                  <Block type={mapRef.current[i][j]}></Block>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Game;
