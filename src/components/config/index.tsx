import React from "react";
import Background from "../background";

import "./config.scss";
interface Props {}

const Config = (props: Props) => {
  const difficulties = ["simple", "common", "hard", "hardest"];
  const difficultiesZH = ["简单", "一般", "困难", "极难"];
  const patterns = ["usually", "dj"];
  const patternsZH = ["默认", "狂暴dj"];

  const storageConfig = JSON.parse(
    localStorage.getItem("configSingle") as string
  );
  const [difficulty, setDifficulty] = React.useState(storageConfig.difficulty);
  const [pattern, setPattern] = React.useState(storageConfig.pattern);
  return (
    <Background>
      <div className="configuration">
        <div className="difficulty configurationItem">
          <span className="difficultyLabel">难度:</span>
          <span className="separator"></span>
          {difficulties.map((type, index) => {
            return index !== difficulties.length - 1 ? (
              <span key={type} className="item">
                <span
                  className={difficulty === type ? `active ${type}` : type}
                  onClick={() => {
                    setDifficulty(type);
                    storageConfig.difficulty = type;
                    localStorage.setItem(
                      "configSingle",
                      JSON.stringify(storageConfig)
                    );
                  }}
                >
                  {difficultiesZH[index]}
                </span>
                <span className="separator">/</span>
              </span>
            ) : (
              <span key={type} className="item">
                <span
                  className={difficulty === type ? `active ${type}` : type}
                  onClick={() => {
                    setDifficulty(type);
                    storageConfig.difficulty = type;
                    localStorage.setItem(
                      "configSingle",
                      JSON.stringify(storageConfig)
                    );
                  }}
                >
                  {difficultiesZH[index]}
                </span>
              </span>
            );
          })}
        </div>
        <div className="pattern configurationItem">
          <span className="patternLabel">游戏模式:</span>
          <span className="separator"></span>
          {patterns.map((type, index) => {
            return index !== patterns.length - 1 ? (
              <span key={type} className="item">
                <span
                  className={pattern === type ? `active ${type}` : type}
                  onClick={() => {
                    setPattern(type);
                    storageConfig.pattern = type;
                    localStorage.setItem(
                      "configSingle",
                      JSON.stringify(storageConfig)
                    );
                  }}
                >
                  {patternsZH[index]}
                </span>
                <span className="separator">/</span>
              </span>
            ) : (
              <span key={type} className="item">
                <span
                  className={pattern === type ? `active ${type}` : type}
                  onClick={() => {
                    setPattern(type);
                    storageConfig.pattern = type;
                    localStorage.setItem(
                      "configSingle",
                      JSON.stringify(storageConfig)
                    );
                  }}
                >
                  {patternsZH[index]}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </Background>
  );
};

export default Config;
