import React, { useState, useEffect } from "react";
import { initSelfGame } from "../game";
import { Block } from "./block";
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
    initSelfGame(mapRef, setMapRef);
    return () => {
      console.log('注销')
    };
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
      {map.map((item, i) => {
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
