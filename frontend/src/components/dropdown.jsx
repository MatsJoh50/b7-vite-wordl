import React, { useState } from 'react';

export default function DropDown({dupe, onChange}){
// console.log('dropdown dupe:', props.dupe)

const handleDropDown = (event) => {
  const selectedValue = event.target.value;
  onChange(selectedValue);
};

  let selectList = []

  if(dupe){
    selectList = [
       "2",
       "3",
       "4",
       "5",
       "6",
       "7",
       "8",
       "9",
       "10",
       "11",
       "12",
       "13",
       "14",
       "15",
       "16",
       "17",
       "18",
       "19",
       "20",
       "21",
       "22",
       "23",
       "24",
       "25",
       "27",
       "28",
       "29",
       "31"
     ]
  } else {
    selectList = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15"
  ]
  }
  return (
    <select
      id="dropDownMenu"
      className='ml-2 w-[4em] h-[3em] text-black p-3 rounded-lg'
      onChange={handleDropDown}
      // value={value}
      >

        <option value="0">0</option>
      {selectList.map((value) => (
        <option key={value} value={value}>{value}</option>
      ))}
    </select>
  );
  
}
