import React, { useState } from 'react';
import './abcdefGPT.css';

function AbcdefGPT() {
  const [isDivClickable, setIsDivClickable] = useState(false);

  const toggleDivClickability = () => {
    setIsDivClickable(!isDivClickable);
  };

  const divClassName = isDivClickable ? 'abcdefGPT-result-tab clickable-div white-bg' : 'abcdefGPT-result-tab';


  return (
    <div className={divClassName}>
      <button className='custom-button' onClick={toggleDivClickability}>
        AI 정보 정리
      </button>
    </div>
  );
}

export default AbcdefGPT;