import React, { useState, useEffect } from 'react';
import {Oval} from "react-loader-spinner";
import './abcdefGPT.css';

function AbcdefGPT() {
  const [isDivClickable, setIsDivClickable] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [renderState, setRenderState] = useState('initial');

  const toggleDivClickability = () => {
    setIsDivClickable(!isDivClickable);
    const timer = setTimeout(() => {
      setRenderState('StartPage');
    }, 2000);
    return () => clearTimeout(timer);
  };

  const divClassName = isDivClickable ? 'abcdefGPT-result-tab clickable-div white-bg' : 'abcdefGPT-result-tab hidden-div';

  const title = document.title;
  const matches = title.match(/'([^']+)'/);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pathArray = window.location.pathname.split('/');
        const aptcode = pathArray[2];

        console.log(aptcode);

        if (matches && matches[1]){
          console.log(matches[1]);
        }

        const response = await fetch('https://f7849c1c-faf4-4fed-b415-610711c64cbd.mock.pstmn.io/apiTest'); 
        const jsonData = await response.json();
        if (jsonData.isSuccess) {
            setData(jsonData.result);
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

  if(renderState==='initial'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability}>
          AI 정보 정리
        </button>
        <div className={divClassName}>
          <div className='custom-header'>
              <button className='close-button' onClick={toggleDivClickability}>
                  <span className='css-33lnss'>
                      <span className='css-1oc9vj8'>
                          <svg width="22" height="22" className='css-14vv9id' xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1 L21 21 M21 1 L1 21"/>
                          </svg>
                      </span>
                  </span>
              </button>
          </div>
          <div className='teamName'>
            <h1>abcdefGPT</h1>
          </div>
          <div className='loading-page'>
            <img src="https://i.imgur.com/gILH0uV.png" alt="logo"/>
            <div className='gif-image'>
              <Oval
                color="#584de4"
                height={200}
                width={200}
              />
            </div>
          </div>
          {/*
          <div className='custom-content'>
              <h1>데이터를 표시하는 예시</h1>
              {isLoading ? (
              <p>데이터를 로드하는 중...</p>
              ) : (
                  <p>{data.str1}</p>
                  )}
          </div>
              */}
        </div>
      </div>
    );
  }else if(renderState==='StartPage'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability}>
          AI 정보 정리
        </button>
        <div className={divClassName}>
          <div className='custom-header'>
              <button className='close-button' onClick={toggleDivClickability}>
                  <span className='css-33lnss'>
                      <span className='css-1oc9vj8'>
                          <svg width="22" height="22" className='css-14vv9id' xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1 L21 21 M21 1 L1 21"/>
                          </svg>
                      </span>
                  </span>
              </button>
          </div>
          
          <div className='custom-content'>
              <h1>새로운 페이지 나올 예정</h1>
          </div>
              
        </div>
      </div>
    );
  }
  
};
export default AbcdefGPT;