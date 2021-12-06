import React, { useState, useEffect } from "react";
import { initMap } from "../utils/map";
import { Box } from "./box";
interface Props {}
const Game: React.FC<Props> = (props) => {
  const [map, setMap] = useState<number[][]>([]);
  useEffect(() => {
    initMap(map, setMap);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {map.map((item, i) => {
        return (
          <div style={{ display: "flex" }} key={i}>
            {item.map((item2, j) => {
              return (
                <div key={j}>
                  <Box type={0}></Box>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Game;
