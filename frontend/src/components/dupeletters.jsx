import React, { useState } from 'react';

function DupeLetter({dupe, onChange}) {
  const [isDupe, setIsDupe] = useState(dupe);

  const toggleDupe = () => {
    const newDupe = !isDupe;
    setIsDupe(newDupe);
    onChange(newDupe);
  };

  return (
    <>
      <input
        id='settings_dupe'
        className='ml-2 w-[1.5em] h-[1.5em] rounded-lg'
        type='checkbox'
        checked={isDupe} // Reflect the state of duplication
        onChange={toggleDupe}
      />
    </>
  );
}

export default DupeLetter;
