import React from "react";
import "./App.css";
// import Game from "./components/game";
// import { startGame } from "./game";
import { Options } from "./components/options";
function App() {
  return (
    <div className="App">
      <Options />
      {/* <Game /> */}
      {/* <button onClick={startGame}>开始单人游戏</button> */}
    </div>
  );
}

export default App;
