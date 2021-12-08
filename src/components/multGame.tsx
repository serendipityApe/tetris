import React from "react";
import Game from "./game/game";
import { forceOverSelfGame } from "../game";
interface Props {}

export const MultGame = (props: Props) => {
  return (
    <div>
      <div
        className="return"
        onClick={() => {
          forceOverSelfGame();
        }}
      >
        <svg
          className="icon"
          aria-hidden="true"
          style={{
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "20px",
            left: "20px",
            fill: "#1E7870",
            cursor: "pointer",
          }}
        >
          <use xlinkHref="#icon-fanhui"></use>
        </svg>
      </div>
      <div
        className="gaming"
        style={{
          display: "flex",
          justifyContent: "space-around",
          //   position: "absolute",
          //   top: "50%",
          //   left: "50%",
          //   transform: "translate(-50%,-50%)",
        }}
      >
        <div>

        <Game type="self"></Game>
        我自己
        </div>
        <Game type="rival"></Game>
      </div>
    </div>
  );
};
