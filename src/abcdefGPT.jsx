import React, { useState, useEffect } from 'react';
import {Oval} from "react-loader-spinner";
import './abcdefGPT.css';

function AbcdefGPT() {
  const [isDivClickable, setIsDivClickable] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [renderState, setRenderState] = useState('initial');
  const [showAll, setShowAll] = useState(false);

  const toggleDivClickability = () => {
    setIsDivClickable(!isDivClickable);
    const timer = setTimeout(() => {
      setRenderState('StartPage');
    }, 2000);
    return () => clearTimeout(timer);
  };

  const handleClick_aptPrice =() =>{
    setRenderState('aptPrice')
  }

  const handleClick_aptComment =() =>{
    setRenderState('aptComment')
  }

  const handleClick_seoulPrice =() =>{
    setRenderState('seoulPrice')
  }

  const handleClick_chatGPT =() =>{
    setRenderState('chatGPT')
  }

  const handleClick_aiRecommend =() =>{
    setRenderState('aiRecommend')
  }

  const handleShowMore = () =>{
    setShowAll(true);
  }
  

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
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
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
              <div className='menu_bar'>
                <ul>
                  <li style={{backgroundColor: '#C8CEFF'}}>
                    <a onClick={handleClick_aptPrice}>아파트 거래 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_aptComment}>아파트 후기 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_seoulPrice}>서울시 거래량 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_chatGPT}>ChatGPT 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_aiRecommend}>AI 아파트 추천</a>
                  </li>
                </ul>
              </div>
              <div className='aptPrice'>
                <div className='content_header'>
                  <img src="https://i.imgur.com/lYgSkrc.jpg" alt="logo"/>
                  <a>아파트 거래 분석</a>
                </div>
                <div className='content_main'>
                  <h3>내용 입력 받아야함1</h3>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }else if(renderState==='aptPrice'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability}>
          AI 정보 정리
        </button>
        <div className={divClassName}>
          <div className='custom-header'>
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
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
              <div className='menu_bar'>
                <ul>
                  <li style={{backgroundColor: '#C8CEFF'}}>
                    <a onClick={handleClick_aptPrice}>아파트 거래 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_aptComment}>아파트 후기 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_seoulPrice}>서울시 거래량 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_chatGPT}>ChatGPT 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_aiRecommend}>AI 아파트 추천</a>
                  </li>
                </ul>
              </div>
              <div className='aptPrice'>
                <div className='content_header'>
                  <img src="https://i.imgur.com/lYgSkrc.jpg" alt="logo"/>
                  <a>아파트 거래 분석</a>
                </div>
                <div className='content_main'>
                  <h3>내용 입력 받아야함1</h3>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }else if(renderState==='aptComment'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability}>
          AI 정보 정리
        </button>
        <div className={divClassName}>
          <div className='custom-header'>
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
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
              <div className='menu_bar'>
                <ul>
                  <li>
                    <a onClick={handleClick_aptPrice}>아파트 거래 분석</a>
                  </li>
                  <li style={{backgroundColor: '#C8CEFF'}}>
                    <a onClick={handleClick_aptComment}>아파트 후기 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_seoulPrice}>서울시 거래량 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_chatGPT}>ChatGPT 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_aiRecommend}>AI 아파트 추천</a>
                  </li>
                </ul>
              </div>
              <div className='aptPrice'>
                <div className='content_header'>
                  <img src="https://i.imgur.com/lYgSkrc.jpg" alt="logo"/>
                  <a>아파트 후기 분석</a>
                </div>
                <div className='content_main'>
                  <ul>
                    <li className='topic'>
                      <a>환경</a>
                      <ul>
                        {[1,2,3,4,5].map((item,index) =>(
                          <li className='comments' key={index} style={{display: index < 2 || showAll ? 'block' : 'none'}}>
                            <a>item {item}</a>
                          </li>
                        ))}
                      </ul>
                      {!showAll && <button onClick={handleShowMore}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>커뮤니티</a>
                      <ul>
                        {[1,2,3,4,5].map((item,index) =>(
                          <li className='comments' key={index} style={{display: index < 2 || showAll ? 'block' : 'none'}}>
                            <a>item {item}</a>
                          </li>
                        ))}
                      </ul>
                      {!showAll && <button onClick={handleShowMore}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>동별특징</a>
                      <ul>
                        {[1,2,3,4,5].map((item,index) =>(
                          <li className='comments' key={index} style={{display: index < 2 || showAll ? 'block' : 'none'}}>
                            <a>item {item}</a>
                          </li>
                        ))}
                      </ul>
                      {!showAll && <button onClick={handleShowMore}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>주변상권</a>
                      <ul>
                        {[1,2,3,4,5].map((item,index) =>(
                          <li className='comments' key={index} style={{display: index < 2 || showAll ? 'block' : 'none'}}>
                            <a>item {item}</a>
                          </li>
                        ))}
                      </ul>
                      {!showAll && <button onClick={handleShowMore}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>교통</a>
                      <ul>
                        {[1,2,3,4,5].map((item,index) =>(
                          <li className='comments' key={index} style={{display: index < 2 || showAll ? 'block' : 'none'}}>
                            <a>item {item}</a>
                          </li>
                        ))}
                      </ul>
                      {!showAll && <button onClick={handleShowMore}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>학군</a>
                      <ul>
                        {[1,2,3,4,5].map((item,index) =>(
                          <li className='comments' key={index} style={{display: index < 2 || showAll ? 'block' : 'none'}}>
                            <a>item {item}</a>
                          </li>
                        ))}
                      </ul>
                      {!showAll && <button onClick={handleShowMore}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>소음</a>
                      <ul>
                        {[1,2,3,4,5].map((item,index) =>(
                          <li className='comments' key={index} style={{display: index < 2 || showAll ? 'block' : 'none'}}>
                            <a>item {item}</a>
                          </li>
                        ))}
                      </ul>
                      {!showAll && <button onClick={handleShowMore}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>주차</a>
                      <ul>
                        {[1,2,3,4,5].map((item,index) =>(
                          <li className='comments' key={index} style={{display: index < 2 || showAll ? 'block' : 'none'}}>
                            <a>item {item}</a>
                          </li>
                        ))}
                      </ul>
                      {!showAll && <button onClick={handleShowMore}>더보기</button>}
                    </li>
                  </ul>
                </div>
              </div>
          </div>
              
        </div>
      </div>
    );
  }else if(renderState==='seoulPrice'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability}>
          AI 정보 정리
        </button>
        <div className={divClassName}>
          <div className='custom-header'>
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
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
              <div className='menu_bar'>
                <ul>
                  <li>
                    <a onClick={handleClick_aptPrice}>아파트 거래 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_aptComment}>아파트 후기 분석</a>
                  </li>
                  <li style={{backgroundColor: '#C8CEFF'}}>
                    <a onClick={handleClick_seoulPrice}>서울시 거래량 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_chatGPT}>ChatGPT 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_aiRecommend}>AI 아파트 추천</a>
                  </li>
                </ul>
              </div>
              <div className='aptPrice'>
                <div className='content_header'>
                  <img src="https://i.imgur.com/lYgSkrc.jpg" alt="logo"/>
                  <a>서울시 거래량 분석</a>
                </div>
                <div className='content_main'>
                  <div className='content_box'>
                    <div className='seoulQ'>
                      <img src="https://i.imgur.com/G77v4vj.jpg"></img>
                      <a>8월과 9월 사이에 거래량의 비율이 가장 많이 증가한 위치와 몇퍼센트인지 알려줘</a>
                    </div>
                    <div className='seoulA'>
                      <img src="https://i.imgur.com/ykkBbKw.png"></img>
                      <a>'중랑구'에서 8월에서 9월 사이에 거래량이 약 42.86% 상승했습니다.</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
              
        </div>
      </div>
    );
  }else if(renderState==='chatGPT'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability}>
          AI 정보 정리
        </button>
        <div className={divClassName}>
          <div className='custom-header'>
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
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
              <div className='menu_bar'>
                <ul>
                  <li>
                    <a onClick={handleClick_aptPrice}>아파트 거래 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_aptComment}>아파트 후기 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_seoulPrice}>서울시 거래량 분석</a>
                  </li>
                  <li style={{backgroundColor: '#C8CEFF'}}>
                    <a onClick={handleClick_chatGPT}>ChatGPT 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_aiRecommend}>AI 아파트 추천</a>
                  </li>
                </ul>
              </div>
              <div className='aptPrice'>
                <div className='content_header'>
                  <img src="https://i.imgur.com/lYgSkrc.jpg" alt="logo"/>
                  <a>ChatGPT 분석</a>
                </div>
                <div className='content_main'>
                  <h3>내용 입력 받아야함4</h3>
                </div>
              </div>
          </div>
              
        </div>
      </div>
    );
  }else if(renderState==='aiRecommend'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability}>
          AI 정보 정리
        </button>
        <div className={divClassName}>
          <div className='custom-header'>
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
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
              <div className='menu_bar'>
                <ul>
                  <li>
                    <a onClick={handleClick_aptPrice}>아파트 거래 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_aptComment}>아파트 후기 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_seoulPrice}>서울시 거래량 분석</a>
                  </li>
                  <li>
                    <a onClick={handleClick_chatGPT}>ChatGPT 분석</a>
                  </li>
                  <li style={{backgroundColor: '#C8CEFF'}}>
                    <a onClick={handleClick_aiRecommend}>AI 아파트 추천</a>
                  </li>
                </ul>
              </div>
              <div className='aptPrice'>
                <div className='content_header'>
                  <img src="https://i.imgur.com/lYgSkrc.jpg" alt="logo"/>
                  <a>AI 아파트 추천</a>
                </div>
                <div className='content_main'>
                  <h3>내용 입력 받아야함5</h3>
                </div>
              </div>
          </div>
              
        </div>
      </div>
    );
  }
  
};
export default AbcdefGPT;