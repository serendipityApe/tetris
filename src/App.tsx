import React from "react";
import "./App.css";
import { Options } from "./components/options/options";
import { initGame } from "./game";

function App() {
  React.useEffect(() => {
    initGame();
  },[]);
  return (
    <div className="App">
      <Options />
    </div>
  );
}

export default App;
