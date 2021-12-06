import React, { useState, useEffect } from "react";
import { initGame } from "../game";
import { Block } from "./block";
// import useUpdate from "../myHooks/useUpdate";
// import { createBox } from "../game/box";
// import render from "../game/render";

// import { addTicker } from "../game/ticker";
// import intervalTimer from "../game/utils/intervalTimer";
// import { hitBottomBorder, hitBottomBox } from "../game/hit";
// import { addBoxtoMap, eliminateLine } from "../game/map";
interface Props {}
const Game: React.FC<Props> = (props) => {
  // const [isStarted, setIsStarted] = useState<boolean>(false);
  const mapRef = React.useRef<number[][]>([]);
  const [map, setMap] = useState<number[][]>(mapRef.current);

  const setMapRef = (_map: number[][]) => {
    mapRef.current = _map;
    setMap(mapRef.current);
  };
  useEffect(() => {
    // startGame(map, setMap);
    initGame(mapRef, setMapRef);
    // eslint-disable-next-line
    // setIsStarted(true);
  }, []);
  // useUpdate(() => {
  //   let activeBox = createBox();
  //   render(activeBox, mapRef, setMapRef);
  //   const isMoveDown = intervalTimer();
  //   function handlerTicker(n: number) {
  //     if (isMoveDown(n, 300)) {
  //       if (
  //         hitBottomBorder(activeBox, mapRef.current) ||
  //         hitBottomBox(activeBox, mapRef.current)
  //       ) {
  //         addBoxtoMap(activeBox, mapRef, setMapRef);
  //         eliminateLine(mapRef, setMapRef);
  //         activeBox = createBox();
  //         return;
  //       }
  //       activeBox.y++;
  //     }
  //     render(activeBox, mapRef, setMapRef);
  //   }

  //   window.addEventListener("keydown", (e) => {
  //     switch (e.code) {
  //       case "ArrowDown":
  //         activeBox.y++;
  //         break;
  //       case "ArrowLeft":
  //         activeBox.x--;
  //         break;
  //       case "ArrowRight":
  //         activeBox.x++;
  //         break;
  //       case "ArrowUp":
  //         console.log(activeBox)
  //         activeBox.rotate();
  //         break;
  //       default: break;
  //     }
  //   });
  //   addTicker(handlerTicker);
  // }, [isStarted]);
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
