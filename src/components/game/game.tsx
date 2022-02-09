import React, { useState, useEffect } from "react";
import {
  initSelfGame,
  initRivalGame,
  operateInMobile,
  getEmitter,
  initAloneGame,
  gameoverAll,
} from "../../game";
import Block from "../block";
import Score from "../score";
import "./game.scss";
import isMobile from "../../game/utils/checkServices";
import OperateInMobile from "../operateInMobile";
interface Props {
  type: string;
}
const Game: React.FC<Props> = (props) => {
  const mapRef = React.useRef<number[][]>([]);
  const [map, setMap] = useState<number[][]>(mapRef.current);
  //判断用户设备
  const userAgent = React.useRef<boolean>(isMobile());
  const setMapRef = (_map: number[][]) => {
    mapRef.current = _map;
    setMap(mapRef.current);
  };
  // const currentGame = React.useRef<ExternalState | null>(null);
  const [score, setScore] = React.useState(0);
  useEffect(() => {
    getEmitter().on("startGame", () => {
      console.log("接收到开始命令");
      if (props.type === "self") {
        initSelfGame(mapRef, setMapRef);
      } else if (props.type === "rival") {
        initRivalGame(mapRef, setMapRef);
      } else {
        let cG = initAloneGame(mapRef, setMapRef);
        cG.getEmitter().on("addScore", () => {
          setScore(cG.getScore());
        });
      }
    });
    return () => {
      gameoverAll();
      console.log("注销");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="gameZone">
      {props.type === "alone" ? <Score score={score}></Score> : ""}
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
      {userAgent.current &&
      (props.type === "self" || props.type === "alone") ? (
        <OperateInMobile operationFunc={operateInMobile} />
      ) : (
        ""
      )}
    </div>
  );
};
export default Game;
