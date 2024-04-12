import React, { useState } from "react";
export default function SetupHighscore({ isOpen, setIsOpen, setScoreName, setComplete }) {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const sendName = () => {
    const highScoreName = document.querySelector("#highscoreInputName").value;
    setScoreName(highScoreName)
  };

  return (
    <div>
      {isOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-90 flex items-center justify-center'>
          <div className='relative bg-blue-500 bg-opacity-80 p-8 w-[40vw] h-[20vh]  border rounded-lg'>
            <button
              onClick={toggleModal}
              className='absolute top-0 right-0 m-4 p-2 bg-white text-gray-500 hover:text-gray-700'>
              Close
            </button>
            <h2 className='text-lg font-semibold mb-4'>
              Congratulation, you won!
            </h2>
            <p className="text-lg">Please enter your name for the HighScore:</p>
            <input id='highscoreInputName' className='rounded pl-2 h-[2em]' />
            <button
              onClick={() => {
                sendName();
                toggleModal();
              }}

              className='absolute bottom-0 right-0 m-4 p-2 bg-white text-gray-500 hover:text-gray-700'
              >
              Submit name
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
