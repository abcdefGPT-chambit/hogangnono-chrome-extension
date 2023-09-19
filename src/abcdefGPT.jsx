import React, { useState, useEffect } from 'react';
import './abcdefGPT.css';

function AbcdefGPT() {
  const [isDivClickable, setIsDivClickable] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleDivClickability = () => {
    setIsDivClickable(!isDivClickable);
  };

  const divClassName = isDivClickable ? 'abcdefGPT-result-tab clickable-div white-bg' : 'abcdefGPT-result-tab hidden-div';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://f7849c1c-faf4-4fed-b415-610711c64cbd.mock.pstmn.io/apiTest'); 
        const jsonData = await response.json();
        if (jsonData.isSuccess) {
            setData(jsonData.result);
            console.log(data.str1);
          } else {
            console.error('API 요청 실패:', jsonData.message);
          }
  
          setIsLoading(false);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
            <div>
                <h1>데이터를 표시하는 예시</h1>
                {isLoading ? (
                <p>데이터를 로드하는 중...</p>
                ) : (
                    <p>{data.str1}</p>
                  )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default AbcdefGPT;