import React from "react";
import { useEffect, useState } from "react";
import "./output.css";
import Gamebody from "./game";
import Options from "./game_settings";
import ShowcaseHighscore from "./highscore_settings";
import SetupHighscore from "./components/SetupHighschore";


function App() {
  const [userId, setUserId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [scoreName, setScoreName] = useState('');
  const [gameSettings, setGameSettings] = useState();
  const [amountOfGuesses, setAmountOfGuesses] = useState();
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

   //opens the "enter your name" window when game is finished, also loggs the end time for highscore.
  useEffect(() => {
    if (gameComplete) {
      setGameComplete(!gameComplete);
      setEndTime(new Date());
    }
  }, [scoreName, amountOfGuesses, gameSettings, gameComplete]);
  // ======  NEED TO CHANGE TO BACKEND FOR HARDEND VERSION ===== 

  //Controlls if a player name has been enterd, if true, it will register the data to highscore-DB
  useEffect(() => {
    if (gameSettings && scoreName != undefined) {
      const timeDifferenceInSeconds = (endTime - startTime) / 1000; // Convert milliseconds to seconds
  
      const newScore = timeDifferenceInSeconds / (amountOfGuesses + 1);
  
      const payload = {
        name: scoreName,
        dupe: gameSettings.dupe,
        sTime: startTime,
        length: gameSettings.drop,
        guesses: amountOfGuesses + 1,
        eTime: endTime,
        score: newScore, // Calculate score
      };
  
  
      // Send payload to the server
      fetch('/api/highscore/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify(payload) // Convert payload to JSON string
      })
        .then(response => {
        })
        .catch(error => {
        });
    }
  }, [scoreName]);


  //Checks the url.pathway to change between highscore or game for express.js compability (atleast how I solved it)
  if (window.location.pathname === "/gethighscore") {
    return (
      <div className='flex flex-col bg-[#f5f5f5] mt-0 min-w-[80vw] w-[80vw] h-[100vh] mx-auto'>
        <ShowcaseHighscore />
      </div>
    );
  } else {
    return (
      <div className='flex flex-col bg-[#f5f5f5] mt-0 min-w-[80vw] w-[80vw] h-[100vh] mx-auto'>
        <SetupHighscore
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setScoreName={setScoreName}
        />
        <Options
          getWord={setUserId}
          gameSettings={setGameSettings}
          isOpen={isOpen}
          isComplete={gameComplete}
          userId={setUserId}
        />
        <Gamebody
          giveWord={userId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          sendAmount={setAmountOfGuesses}
          isComplete={gameComplete}
          setComplete={setGameComplete}
          userId={userId}
        />
      </div>
    );
  }
}
export default App;
