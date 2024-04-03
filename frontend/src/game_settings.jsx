import React from "react";
import {useEffect, useState} from "react"
import DupeLetter from "./components/dupeletters";
import DropDown from "./components/dropdown";


export default function Options({getWord}) {

  const [dupeValue, setDupeValue] = useState(true);
  const [dropValue, setDropValue] = useState(0);




  //Set drop value to 0 when changing from true/false
  useEffect(() => {
    setDropValue(0);
    document.querySelector('#dropDownMenu').value=0
  }, [dupeValue]);

  //Fetch new word when value changes
  useEffect(() => {
  if(dropValue !== 0){
    fetchWord()
  }
  }, [dropValue])
  
const gettingRandomWord = (RndWord) => {
  getWord(RndWord);
}
  const handleDupeChange = (newDupeValue) => {
    setDupeValue(newDupeValue);
   }

  const handleDropDown = (value) => {
    setDropValue(value);
    // console.log('drop value:', value);
  }

  async function fetchWord(){
    const response = await fetch(`/api/randomword/${dupeValue}/${dropValue}`)
    const parsedWord = await response.json()
    await gettingRandomWord(parsedWord)

  }

  function StartGame({onClick}){

    return (
      <>
      <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg drop-shadow-mg'
      onClick={onClick}
      >
      Start new game
          </button>
      </>
      )
  }




  return (
    <div className='w-4/5 bg-bars rounded-lg flex flex-col mx-auto my-5 pb-4'>
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
            <StartGame onClick={fetchWord} type={dupeValue} value={dropValue}/>
        </div>
      </div>
    </div>
  );
}
