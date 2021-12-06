import React, { useState, useEffect } from "react";
import { startGame } from "../game";
import { Block } from "./block";
import useUpdate from "../myHooks/useUpdate";
import { createBoxByType } from "../game/box";
import render from "../game/render";
import { addTicker } from "../game/ticker";
import intervalTimer from "../game/utils/intervalTimer";
import { getBoxBottomPoints } from "../game/matrix";
import { hitBottomBorder } from "../game/hit";
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
    let activeBox = createBoxByType(1);
    render(activeBox, map, setMap);
    const isMoveDown = intervalTimer();
    function handlerTicker(n: number) {
      if (isMoveDown(n, 300)) {
        if (hitBottomBorder(activeBox, map)) {
          activeBox = createBoxByType(1);
          return;
        }
        activeBox.y++;
      }
      render(activeBox, map, setMap);
    }

    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowDown") {
        activeBox.y++;
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
