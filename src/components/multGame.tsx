import React from "react";
import Game from "./game/game";

import { message } from "../game/message";
import { initGameMult, startGame } from "../game";
import { debounce } from "../utils/debounce";
import Background from "./background";
import { useLocation } from "react-router-dom";
interface Props {}

export const MultGame = (props: Props) => {
  const [myName, setMyName] = React.useState<string | null>(
    localStorage.getItem("myName")
  );
  const [rival, setRival] = React.useState("待加入......");

  React.useEffect(() => {
    console.log("加载完成");
    initGameAndReceive();
  }, []);
  function initGameAndReceive() {
    initGameMult(localStorage.getItem("myName") as string, isHost.current);
    console.log(message.isConnect());
    message.on("newUserName", (name) => {
      console.log(name + "加入房间");
      setRival(name);
    });
    if (!isHost.current) {
      console.log(isHost.current);
      message.on("hostStartGame", () => {
        startGame();
        console.log("接收到hostStartGame");
      });
    }
  }
  const location = useLocation();
  function getHost() {
    return decodeURI(location.pathname.split("-").pop() as string);
  }
  const isHost = React.useRef<boolean>(getHost() === myName);
  const setName = debounce((value: string) => {
    localStorage.setItem("myName", value);
  }, 500);
  React.useEffect(() => {
    document.title = `${getHost()}的房间`;
  });
  return (
    <div>
      {myName ? (
        <div>
          {/* <div
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
          </div> */}
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
              {myName}
              {isHost.current ? (
                <button
                  onClick={() => {
                    console.log("发起hostStartGame");
                    message.emit("hostStartGame");
                    startGame();
                  }}
                >
                  开始游戏
                </button>
              ) : (
                ""
              )}
            </div>
            <div>
              <Game type="rival"></Game>
              {isHost.current ? rival : getHost()}
            </div>
          </div>
        </div>
      ) : (
        <Background>
          <div>
            <input
              type="text"
              placeholder="输入名字用以展示"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button
              onClick={() => {
                initGameAndReceive();
                setMyName(localStorage.getItem("myName"));
              }}
            >
              确认
            </button>
          </div>
        </Background>
      )}
    </div>
  );
};
