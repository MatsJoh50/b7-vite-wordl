import React from "react";
import {useState} from "react"

export default function Gamebody() {
  const letterBox =
    "text-xl w-[4em] h-[4em] grid place-content-center rounded-lg drop-shadow-md";

  const [guesses, setGuesses] = useState([
    [
      { letter: "A", result: "correct", color: "bg-green-500" },
      { letter: "R", result: "misplaced", color: "bg-yellow-500" },
      { letter: "M", result: "incorrect", color: "bg-red-500" },
      { letter: "E", result: "incorrect", color: "bg-red-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
    ],
    [
      { letter: "A", result: "correct", color: "bg-green-500" },
      { letter: "R", result: "misplaced", color: "bg-yellow-500" },
      { letter: "M", result: "incorrect", color: "bg-red-500" },
      { letter: "E", result: "incorrect", color: "bg-red-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
    ],
    [
      { letter: "A", result: "correct", color: "bg-green-500" },
      { letter: "R", result: "misplaced", color: "bg-yellow-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
    ],
    [
      { letter: "A", result: "correct", color: "bg-green-500" },
      { letter: "M", result: "incorrect", color: "bg-red-500" },
      { letter: "E", result: "incorrect", color: "bg-red-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
      { letter: "N", result: "correct", color: "bg-green-500" },
    ],
  ]);

  function PrintWord(props) {
    const result = props.result;
    const letter = props.letter;
    const color = props.color;
    return <div className={`${color} ${letterBox}`}>{letter}</div>;
  }

  function GuessWord({guesses, setGuesses}) {
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
      console.log(e.target.value)
      setInput(e.target.value);
    };



    // const submitGuess = () => {
    //   if(input.trim() !== ''){
    //     setGuesses([...guesses, [input.trim()]]);
    //     setInput('');
    //   }
    // };
    const submitGuess = () => {
      console.log('input is: ', input)
      if (input.trim() !== '') {
        const newGuess = input.trim().split('').map(letter => ({
          letter,
          result: 'pending', // Set default result
          color: 'bg-gray-500', // Set default color
        }));
        console.log('new guess: ', newGuess)
        setGuesses([...guesses, newGuess]); // Push new guess as an array of objects
        setInput('');
      }
    };
    

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        console.log('enter')
        submitGuess();
      }
    };
    
    return (

      <input
        className='h-10 w-4/5 rounded-lg pl-5 mt-10'
        placeholder='Enter your guess'
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    );
  }

  return (
    <div
      id='maby_body'
      className='bg-bg w-90 h-full flex justify-center items-center'>
      <div className='min-w-4/5 w-4/5 bg-bars h-full flex flex-col  mt-10 rounded-md '>
        <div className='w-full items-center flex justify-center mx-auto mb-20'>
          <GuessWord />
        </div>
        <div className='flex flex-col justify-start justify-center justify-evenly'>
          {guesses.reverse().map((guess, index) => (
            <div
              className='flex flex-row justify-center justify-evenly mb-[2%]'
              key={index}>
              {guess.map((guessItem, innerIndex) => (
                <PrintWord
                  key={`${index}-${innerIndex}`}
                  result={guessItem.result}
                  letter={guessItem.letter}
                  color={guessItem.color}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
