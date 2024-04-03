import React from "react";
import {useEffect, useState} from "react"
import "./output.css";
import Navbar from "./navbar";
import Gamebody from "./game";
import Options from "./game_settings"


function App() {
  const [randomWord, setRandomWord] = useState();

  //Control to see that random fetch works.
  useEffect(() => {
      console.log(randomWord)
  }, [randomWord]);

  return (
    <div className="flex flex-col mt-0 min-w-[80vw] w-[80vw] h-[100vh] mx-auto border">
      <Navbar />
      <Options getWord={setRandomWord}/>
      <Gamebody giveWord={randomWord}/>
    </div>
  );
}

export default App;
