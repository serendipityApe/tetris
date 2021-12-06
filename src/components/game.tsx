import React, { useState, useEffect } from "react";
import { startGame } from "../game";
import { Block } from "./block";
import useUpdate from "../myHooks/useUpdate";
import { createBoxByType } from "../game/box";
import render from "../game/render";
import { addTicker } from "../game/ticker";
interface Props {}
const Game: React.FC<Props> = (props) => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [map, setMap] = useState<number[][]>([]);
  useEffect(() => {
    startGame(map, setMap);
    // eslint-disable-next-line
    setIsStarted(true);
  }, []);
  useUpdate(() => {
    let box = createBoxByType(1);
    render(box, map, setMap);
    const isMoveDown = intervalTimer();
    function handlerTicker(n: number) {
      if (isMoveDown(n, 1000)) {
        box.y++;
      }
      render(box, map, setMap);
    }
    function intervalTimer() {
      let t = 0;
      return (n: number, intervalTime: number) => {
        t += n;
        if (t >= intervalTime) {
          t = 0;
          return true;
        }
        return false;
      };
    }
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowDown") {
        box.y++;
      }
    });
    addTicker(handlerTicker);
  }, [isStarted]);
  return (
    <div>
      {map.map((item, i) => {
        return (
          <div style={{ display: "flex" }} key={i}>
            {item.map((item2, j) => {
              return (
                <div key={j}>
                  <Block type={map[i][j]}></Block>
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
