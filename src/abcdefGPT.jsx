import React from 'react';

function AbcdefGPT() {
    const divStyle = {
        position: 'absolute',
        top: '0',
        left: '750px',
        width: '375px',
        height: '100%',
        pointerEvents: 'none',
        background: "lightblue"
      };
    
      return (
        <div id="abcdefGPT-result-tab" style={divStyle}>
          <button>버튼 텍스트</button>
        </div>
      );
}

export default AbcdefGPT;