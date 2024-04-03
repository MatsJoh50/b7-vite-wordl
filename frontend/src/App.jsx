import React from "react";
import { useEffect, useState } from "react";
import "./output.css";
import Navbar from "./navbar";
import Gamebody from "./game";
import Options from "./game_settings";
import SetupHighscore from "./components/SetupHighschore";

function App() {
  const [randomWord, setRandomWord] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [scoreName, setScoreName] = useState();

  useEffect(() => {
    console.log('ScoreName: ', scoreName)
  }, [scoreName]);

  //Control to see that random fetch works.
  useEffect(() => {
      console.log(randomWord)
  }, [randomWord]);

  return (
      <div className='flex flex-col bg-[#f5f5f5] mt-0 min-w-[80vw] w-[80vw] h-[100vh] mx-auto'>
        <SetupHighscore isComplete={isOpen} setIsComplete={setIsOpen} setScoreName={setScoreName}/>
        <Navbar />
        <Options getWord={setRandomWord} />
        <Gamebody giveWord={randomWord} isComplete={isOpen} setIsComplete={setIsOpen}/>
      </div>
  );
}

export default App;
