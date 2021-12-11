import React from "react";
import Background from "../components/background";
import uniqid from "uniqid";

import { useNavigate } from "react-router-dom";
interface Props {}

const ConfigMult = (props: Props) => {
  let navigate = useNavigate();
  const [nickName, setNickName] = React.useState<string>(
    localStorage.getItem("myName") as string
  );
  return (
    <Background>
      <span>你的名字</span>
      <input
        type="cickName"
        placeholder="输入一个名字用以展示"
        value={nickName}
        onChange={(e) => {
          setNickName(e.target.value);
        }}
      />
      <button
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
    </Background>
  );
};

export default ConfigMult;
