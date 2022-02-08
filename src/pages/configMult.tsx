import React from "react";
import Background from "../components/background";
import uniqid from "uniqid";
import "./createRoom.scss";
import { useNavigate } from "react-router-dom";
import { themeConfig } from "../game/config";
interface Props {}

const ConfigMult = (props: Props) => {
  const configTheme = JSON.parse(
    localStorage.getItem("configSingle") as string
  ).theme;
  let navigate = useNavigate();
  const [nickName, setNickName] = React.useState<string>(
    localStorage.getItem("myName") as string
  );
  return (
    <Background>
      <div className="createRoom">
        <div className="inputs">
          <div className="item classic">
            <input
              className="cleanSlide"
              style={{ color: themeConfig[configTheme][1] }}
              type="cickName"
              placeholder="输入一个名字用以展示"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            />
            <label htmlFor="你的名字">你的名字</label>
          </div>
          <div className="item readOnly">
            <input
              className="cleanSlide"
              type="cickName"
              placeholder="房间名"
              value={nickName ? `${nickName}的房间` : `请先输入您的名字`}
              readOnly
            />
            <label htmlFor="房间名">房间名</label>
          </div>
        </div>
        <button
          className="button"
          style={{
            backgroundColor: themeConfig[configTheme][-99],
            border: `1px solid ${themeConfig[configTheme][-99]}`,
          }}
          onClick={() => {
            localStorage.setItem("myName", nickName as string);
            navigate(`dRoom-${uniqid()}-${nickName}`, {
              replace: true,
              state: { nickName },
            });
            // initGame();
          }}
        >
          创建房间
        </button>
      </div>
    </Background>
  );
};

export default ConfigMult;
