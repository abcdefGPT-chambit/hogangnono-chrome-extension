import React, { useState } from 'react';
import './abcdefGPT.css';

function AbcdefGPT() {
  const [isDivClickable, setIsDivClickable] = useState(false);

  const toggleDivClickability = () => {
    setIsDivClickable(!isDivClickable);
  };

  const divClassName = isDivClickable ? 'abcdefGPT-result-tab clickable-div white-bg' : 'abcdefGPT-result-tab hidden-div';


  return (
    <div className='custom-tab'>
      <button className='custom-button' onClick={toggleDivClickability}>
        AI 정보 정리
      </button>
      <div className={divClassName}>
        <div className='custom-header'>
        <button className='close-button' onClick={toggleDivClickability}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default AbcdefGPT;