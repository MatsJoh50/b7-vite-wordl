import React from "react";
import { useState } from "react";
import createWordlItem from "./createWorldItem";


export default function Gamebody() {

  
  
  function PrintWord(props) {
    const result = props.result;
    const letter = props.letter;
    const color = props.color;
    const inputSize = props.size;

    const size = 30/inputSize;
    
      const letterBox =
        `text-xl grid place-content-center rounded-lg drop-shadow-md max-h-[4em] max-w-[4em]`;
    //   return <div className={`${color} ${letterBox} `}>{letter}</div>;
    // }

    //Style component for responsive size-ing
    const style = {
      height: `${size}vw`,
      width: `${size}vw`,

    };
  
    return <div style={style} className={`${color} ${letterBox}`} >{letter}</div>;
  }

  function InputGuess() {
    const [input, setInput] = useState("");
    
  const [guesses, setGuesses] = useState([
    [
      { letter: "A", result: "correct", color: "bg-green-500" },
      { letter: "R", result: "misplaced", color: "bg-yellow-500" },
      { letter: "M", result: "incorrect", color: "bg-red-500" },
      { letter: "E", result: "incorrect", color: "bg-red-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
    ],
  ]);

    const handleInputChange = (e) => {
      setInput(e.target.value.trim());
    };

    const submitGuess = () => {
      if (input.trim() !== "") {
        const newGuess = input
          .toUpperCase()
          .split("")
          .map((letter) => ({
            letter,
            result: "pending", // Set default result
            color: "bg-green-500", // Set default color
          }));
        setGuesses([...guesses, newGuess]); // Push new guess as an array of objects
        setInput("");
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitGuess();
      }
    };

    return (
      <div className="flex flex-col justify-center items-center w-full">
        <input
          id='inputBox'
          className='h-10 w-3/5 rounded-lg pl-5 mt-10'
          placeholder='Enter your guess'
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          />
        <div className='flex flex-col justify-start justify-center justify-evenly w-full'>
          {guesses.slice().reverse().map((guess, index) => (
            <div
            className='flex flex-row justify-center justify-evenly mt-[2em]'
            key={index}>
              {guess.map((guessItem, innerIndex) => (
                <PrintWord
                key={`${index} ${innerIndex}`}
                result={guessItem.result}
                letter={guessItem.letter}
                color={guessItem.color}
                size={4}
                />
                ))}
            </div>
          ))}
          </div>
        </div>
    );
  }

  return (
    <div
      id='maby_body'
      className='bg-bg w-90 h-full flex justify-center items-center'>
      <div className='min-w-4/5 w-4/5 bg-bars h-full flex flex-col  mt-10 rounded-md '>
        <div className='w-full items-center flex justify-center mx-auto mb-20'>
          <InputGuess />
        </div>
      </div>
    </div>
  );
}
