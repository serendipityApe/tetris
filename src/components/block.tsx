import React from "react";
import { themeConfig } from "../game/config";
interface Props {
  type: number;
}

const Block = (props: Props) => {
  const configTheme = JSON.parse(
    localStorage.getItem("configSingle") as string
  ).theme;
  const typeToColorMap: { [key: number]: string } = themeConfig[configTheme];
  // {
  //   //5FB095   34776C 1E7870 218C47 597961 5A8D8A  719A8F
  //   // B2BF88 CADCB6
  //   0: "#CADCB6",
  //   1: "#1F8258",
  //   2: "#B2BF88",
  //   3: "#1E7870",
  //   4: "#218C47",
  //   [-1]: "#1E7870",
  // };
  return (
    <div
      style={{
        backgroundColor: typeToColorMap[props.type],
        width: "20px",
        height: "20px",
        border: `1px solid ${typeToColorMap[-2]}`,
        boxShadow: "inset 0 0 1px 1px white",
        color: "whitesmoke",
      }}
    >
      {/* {props.type} */}
    </div>
  );
};
export default Block;
