import React from "react";
import Game from "./game";
import { forceOverGame } from "../game";
interface Props {}

export const SingleGame = (props: Props) => {
  return (
    <div>
      <div
        className="return"
        onClick={() => {
          forceOverGame();
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Game></Game>
      </div>
    </div>
  );
};
