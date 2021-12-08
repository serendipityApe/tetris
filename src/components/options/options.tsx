import React from "react";
import { SingleGame } from "../singleGame";
import { startGame, setGameoverHandler } from "../../game";
import "./options.scss";
interface Props {}

export const Options = (props: Props) => {
  const [pattern, setPattern] = React.useState("option");
  return (
    <div>
      {(() => {
        switch (pattern) {
          case "option":
            return (
              <div className="homeOptions">
                <div className="overlay"></div>
                <ul className="myOptions">
                  <li
                    className="alone"
                    onClick={() => {
                      setPattern("alone");
                      setGameoverHandler(() => {
                        setPattern("option");
                      });
                      setTimeout(() => {
                        startGame();
                        //可以加个倒计时
                      }, 1000);
                    }}
                  >
                    单人模式
                  </li>
                  <li
                    className="online"
                    onClick={() => {
                      alert("开发中......");
                    }}
                  >
                    多人对战
                  </li>
                  <li className="set">
                    设置
                  </li>
                  <li className="help">
                    帮助
                  </li>
                  <li
                    className="more"
                    onClick={() => {
                      window.open("https://github.com/serendipityApe/tetris");
                    }}
                  >
                    关于
                  </li>
                </ul>
              </div>
            );
          case "alone":
            return <SingleGame></SingleGame>;
        }
      })()}
    </div>
  );
};
