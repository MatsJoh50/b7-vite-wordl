import React, { useEffect } from "react";
import { useState } from "react";
import createWordlItem from "./createWorldItem.jsx";

export default function Gamebody({
  giveWord,
  isOpen,
  setIsOpen,
  sendAmount,
  isComplete,
  setComplete,
  userId,
}) {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [inputLength, setInputLength] = useState(0);
  useEffect(() => {
    if (giveWord && giveWord.word) {
      setInputLength(giveWord.word.length);
    }
  }, [giveWord]);

  function PrintWord(props) {
    const letter = props.letter;
    const color = props.color;
    const inputSize = props.size;

    const size = 30 / inputSize;

    const letterBox = `text-xl grid place-content-center rounded-lg drop-shadow-md max-h-[4em] max-w-[4em]`;

    //Style component for responsive size-ing
    const style = {
      height: `${size}vw`,
      width: `${size}vw`,
    };

    return (
      <div style={style} className={`${color} ${letterBox}`}>
        {letter}
      </div>
    );
  }

  function InputGuess() {
    const [input, setInput] = useState("");
    const [guesses, setGuesses] = useState([]);

    useEffect (() => {
      console.log('useeffect:', guesses)
    },[guesses])

    //Updates the value "Input" for each keystroke.
    const handleInputChange = (e) => {
      setInput(e.target.value.trim().toUpperCase());
    };

    //Checks for "Enter" to correct your guess.
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitGuess();
      }
    };

    //Function do add and controll the new guess.
    //Will also open modal for highscore name registration if correct word is found.

    async function sendGuess(userId, word) {
      console.log("userid", userId);
      const fetchUrl = `/api/games/${userId}/guesses`;
      const request = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guess: word }),
      });
      return request.json();
    }

    const submitGuess = async () => {
      console.log(input);
      // if(input.length == inputLength){
      if (input.trim() !== "") {
        const newGuess = await sendGuess(userId, input);
        // console.log(newGuess);
        await setGuesses(newGuess.guesses); // Push new guess as an array of objects
        // await setGuesses([...guesses, newGuess.guesses]); // Push new guess as an array of objects
        setInput("");

        if (newGuess.correct) {
          toggleModal();
          setComplete(true);
        }
      } else {
        document.querySelector("#inputBox").value = "";
        document.querySelector("#inputBox").placeholder =
          "Guessed word isn't long enogh";
      }
    };

    return (
      <div className='flex flex-col justify-center items-center w-full'>
        <input
          id='inputBox'
          className='h-10 w-3/5 rounded-lg pl-5 mt-10'
          placeholder='Enter your guess'
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          // minLength={inputLength}
          // maxLength={inputLength}
        />
        <div className='flex flex-col justify-start justify-center justify-evenly w-full'>
          {guesses
            .slice()
            .reverse()
            .map((guess, index) => (
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
      className='bg-[#f5f5f5] w-90 h-full flex justify-center items-center'>
      <div className='min-w-4/5 w-4/5 bg-[#34495e] h-full flex flex-col  mt-10 rounded-md '>
        <div className='w-full items-center flex justify-center mx-auto mb-20 min-h-full'>
          <InputGuess />
        </div>
      </div>
    </div>
  );
}
