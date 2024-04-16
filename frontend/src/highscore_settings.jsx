import React from "react";
import {useEffect, useState} from "react"
import DupeLetter from "./components/dupeletters";
import DropDown from "./components/dropdown";


export default function ShowcaseHighscore() {

  const [dupeValue, setDupeValue] = useState(true);
  const [dropValue, setDropValue] = useState(0);


 

  //Set drop value to 0 when changing from true/false
  useEffect(() => {
    setDropValue(0);
    document.querySelector('#dropDownMenu').value=0
  }, [dupeValue]);

  
  const handleDupeChange = (newDupeValue) => {
    setDupeValue(newDupeValue);
   }

  const handleDropDown = (newDropValue) => {
    setDropValue(newDropValue);
    // console.log('drop value:', value);
  }

  async function fetchHighScore() {
    try {
      const url = `/highscore/${dupeValue}/${dropValue}`;
      const response = await fetch(url);
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      
      // Optionally handle the response data here
      
      // Redirect the user to the specified URL
      window.location.assign(url);
    } catch (error) {
      console.error('Error fetching high score:', error);
      // Optionally handle the error, e.g., display an error message to the user
    }
  }
  
  function GetHighScore({onClick}){

    return (
      <>
      <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg drop-shadow-mg'
      onClick={onClick}
      >
      Get HighScore
          </button>
      </>
      )
  }




  return (
    <div className='w-4/5 bg-[#34495e] rounded-lg flex flex-col mx-auto my-5 pb-4'>
      <h2
        id='game_settings_header'
        className='justify-center flex text-3xl text-white mb-2'>
        Game Settings
      </h2>
      <div className="flex flex-row justify-between px-[3em]">
        <div id='game_settings' className='flex w-2/5'>
          <form className='flex flex-col ml-5 text-xl w-full'>
            <label className='text-white mb-3 flex items-center justify-between'>
            Dublicate letters:
             <DupeLetter dupe={dupeValue} onChange={handleDupeChange}/>
            </label>
            <label className='text-white flex items-center justify-between'>
              Amount of letters:
              <DropDown dupe={dupeValue} onChange={handleDropDown}/>
            </label>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center">
            <GetHighScore onClick={fetchHighScore} type={dupeValue} value={dropValue}/>
        </div>
      </div>
    </div>
  );
}
