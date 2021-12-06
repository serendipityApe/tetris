import React from "react";

interface Props {
  type: number;
}

export const Block = (props: Props) => {
  const typeToColorMap: { [key: number]: string } = {
      //5FB095   34776C 1E7870 218C47 597961 5A8D8A
    0: "#719A8F",
    1: "#1F8258",
  };
  return (
    <div
      style={{
        backgroundColor: typeToColorMap[props.type],
        width: "20px",
        height: "20px",
        margin: "2px",
        color: "whitesmoke"
      }}
    >
      {props.type}
    </div>
  );
};
