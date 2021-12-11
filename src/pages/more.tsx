import React from "react";
import Background from "../components/background";
interface Props {}

const More = (props: Props) => {
  return (
    <Background>
      <div className="more" style={{ color: "whitesmoke" }}>
        {/* <p>基于react,nodejs,websocket制作。</p> */}
        <p>
          该项目开源，地址为：
          <a
            style={{ color: "whitesmoke" }}
            href="https://github.com/serendipityApe/tetris"
          >
            https://github.com/serendipityApe/tetris
          </a>
        </p>
      </div>
    </Background>
  );
};

export default More;
