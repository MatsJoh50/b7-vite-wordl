import React from "react";
import "./output.css";
import Navbar from "./navbar";
import Gamebody from "./game";
import Options from "./game_settings"

function App() {

  return (
    <div className="flex flex-col mt-0 min-w-[80vw] w-[80vw] h-[100vh] mx-auto border">
      <Navbar />
      <Options />
      <Gamebody/>
    </div>
  );
}

export default App;
