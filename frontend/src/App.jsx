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
  const [gameSettings, setGameSettings] = useState();
  const [amountOfGuesses, setAmountOfGuesses] = useState();
  const [gameComplete, setGameComplete] = useState(false);


useEffect(() => {
  if(gameComplete){
    setGameComplete(!gameComplete)
    console.log('new game compleate:',gameComplete)
  }
}, [scoreName, amountOfGuesses, gameSettings, gameComplete])

  //Console.log's to controll the code.
  useEffect(() => {
    console.log('New Random word:', randomWord)
  }, [randomWord]);
  
  useEffect(() => {
    console.log('ScoreName: ', scoreName)
  }, [scoreName]);

  useEffect(() => {
    console.log('Settings:', gameSettings)
  }, [scoreName])

  useEffect(() => {
    console.log('Guesses:', amountOfGuesses)
  }, [scoreName])

  /////////////////////////


  return (
      <div className='flex flex-col bg-[#f5f5f5] mt-0 min-w-[80vw] w-[80vw] h-[100vh] mx-auto'>
        <SetupHighscore isOpen={isOpen} setIsOpen={setIsOpen} setScoreName={setScoreName} />
        <Navbar />
        <Options getWord={setRandomWord} gameSettings={setGameSettings} isOpen={isOpen} isComplete={gameComplete}/>
        <Gamebody giveWord={randomWord} isOpen={isOpen} setIsOpen={setIsOpen} sendAmount={setAmountOfGuesses} isComplete={gameComplete} setComplete={setGameComplete}/>
      </div>
  );
}

export default App;
