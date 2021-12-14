import React from "react";
import Game from "./game/game";
import { forceOverSelfGame, initGameSelf } from "../game";
import { themeConfig } from "../game/config";
interface Props {}

export const SingleGame = (props: Props) => {
  const configTheme = JSON.parse(
    localStorage.getItem("configSingle") as string
  ).theme;
  React.useEffect(() => {
    initGameSelf();
  }, []);
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
            fill: `${themeConfig[configTheme  ][-1]}`,
            cursor: "pointer",
          }}
        >
          <use xlinkHref="#icon-fanhui"></use>
        </svg>
      </div>
      <div
        className="gaming"
        style={{
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%,-50%)",
          display: "inline-block",
          marginTop: "8rem",
        }}
      >
        <Game type="single"></Game>
      </div>
    </div>
  );
};
