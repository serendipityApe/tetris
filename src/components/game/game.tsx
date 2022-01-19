import React, { useState, useEffect } from "react";
import {
  initSelfGame,
  initRivalGame,
  operateInMobile,
  getEmitter,
  initAloneGame,
  gameoverAll,
} from "../../game";
import { Block } from "../block";
import "./game.scss";
import isMobile from "../../game/utils/checkServices";
interface Props {
  type: string;
}
const Game: React.FC<Props> = (props) => {
  // const [isStarted, setIsStarted] = useState<boolean>(false);
  const mapRef = React.useRef<number[][]>([]);
  const [map, setMap] = useState<number[][]>(mapRef.current);
  //判断用户设备
  const userAgent = React.useRef<boolean>(isMobile());
  const setMapRef = (_map: number[][]) => {
    mapRef.current = _map;
    setMap(mapRef.current);
  };
  useEffect(() => {
    getEmitter().on("startGame", () => {
      console.log("接收到开始命令");
      if (props.type === "self") {
        initSelfGame(mapRef, setMapRef);
      } else if (props.type === "rival") {
        initRivalGame(mapRef, setMapRef);
      } else {
        initAloneGame(mapRef, setMapRef);
      }
    });
    return () => {
      gameoverAll();
      console.log("注销");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const longPressureListener = React.useRef<{
    inter: NodeJS.Timeout | null;
    timeOut: NodeJS.Timeout | null;
  }>({
    inter: null,
    timeOut: null,
  });
  function longPressureArrowMainoperation() {
    longPressureListener.current.inter = setInterval(() => {
      operateInMobile("ArrowDown");
      // console.log("持续下降中");
    }, 100);
  }
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
    <div className="gameZone">
      <div className="gameWindow">
        {/* <div className="container"></div> */}
        {map.map((item, i) => {
          return (
            <div style={{ display: "flex" }} className="row" key={i}>
              {item.map((item2, j) => {
                return (
                  <div key={j} className="row_item">
                    <Block type={mapRef.current[i][j]}></Block>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {(() => {
        if (userAgent.current) {
          return (
            <div className="gameOperation">
              <div className="content">
                <div
                  className="arrowLeft"
                  onTouchStart={() => {
                    operateInMobile("ArrowLeft");
                  }}
                >
                  <svg
                    className="icon"
                    aria-hidden="true"
                    style={{
                      width: "50px",
                      height: "50px",
                      fill: "#1E7870",
                      cursor: "pointer",
                    }}
                  >
                    <use xlinkHref="#icon-ArrowLeft"></use>
                  </svg>
                </div>
                <div
                  className="arrowMain"
                  onTouchStart={(e) => {
                    longPressureListener.current.timeOut = setTimeout(() => {
                      longPressureArrowMainoperation();
                    }, 500);
                  }}
                  // onTouchMove={() => {
                  //   clearTimeout(Number(longPressureListener.current.timeOut));
                  //   clearInterval(Number(longPressureListener.current.inter));
                  //   longPressureListener.current.timeOut = null;
                  //   longPressureListener.current.inter = null;
                  // }}
                  onTouchEnd={() => {
                    if (longPressureListener.current.inter) {
                      clearInterval(Number(longPressureListener.current.inter));
                      longPressureListener.current.timeOut = null;
                      longPressureListener.current.inter = null;
                    } else {
                      clearTimeout(
                        Number(longPressureListener.current.timeOut)
                      );
                      operateInMobile("ArrowUp");
                    }
                  }}
                >
                  <svg
                    className="icon"
                    aria-hidden="true"
                    style={{
                      width: "50px",
                      height: "50px",
                      fill: "#1E7870",
                      cursor: "pointer",
                    }}
                  >
                    <use xlinkHref="#icon-lingjiechuxunhuan"></use>
                  </svg>
                </div>
                <div
                  className="arrowRight"
                  onTouchStart={() => {
                    operateInMobile("ArrowRight");
                  }}
                >
                  <svg
                    className="icon"
                    aria-hidden="true"
                    style={{
                      width: "50px",
                      height: "50px",
                      fill: "#1E7870",
                      cursor: "pointer",
                    }}
                  >
                    <use xlinkHref="#icon-ArrowRight"></use>
                  </svg>
                </div>
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};
export default Game;
