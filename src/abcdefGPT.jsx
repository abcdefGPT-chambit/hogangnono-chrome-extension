import React, { useState, useEffect, useRef } from 'react';
import {Oval} from "react-loader-spinner";
import './abcdefGPT.css';
import useFetch from './usefetch';


function AbcdefGPT() {
  const [isDivClickable, setIsDivClickable] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [renderState, setRenderState] = useState('initial');
  const [showAllEnv, setShowAllEnv] = useState(false);
  const [showAllComm, setShowAllComm] = useState(false);
  const [showAllAptChar, setShowAllAptChar] = useState(false);
  const [showAllStore, setShowAllStore] = useState(false);
  const [showAllTraffic, setShowAllTraffic] = useState(false);
  const [showAllSchool, setShowAllSchool] = useState(false);
  const [showAllNoise, setShowAllNoise] = useState(false);
  const [showAllParking, setShowAllParking] = useState(false);

  

  const toggleDivClickability = () => {
    setIsDivClickable(!isDivClickable);
    if(renderState === 'initial'){
      const timer = setTimeout(() => {
        setRenderState('StartPage');
      }, 2000);
    }
    return () => clearTimeout(timer);
  };

  const handleClick_aptPrice =() =>{
    setRenderState('StartPage')
  };

  const handleClick_aptComment =() =>{
    setRenderState('aptComment')
  };

  const handleClick_seoulPrice =() =>{
    setRenderState('seoulPrice')
  };

  const handleClick_chatGPT =() =>{
    setRenderState('chatGPT')
  };

  const handleClick_aiRecommend =() =>{
    setRenderState('aiRecommend')
  };

  const handleShowMoreEnv = () =>{
    setShowAllEnv(true);
  };
  const handleShowMoreComm = () =>{
    setShowAllComm(true);
  };
  const handleShowMoreAptChar = () =>{
    setShowAllAptChar(true);
  };
  const handleShowMoreStore = () =>{
    setShowAllStore(true);
  };
  const handleShowMoreTraffic = () =>{
    setShowAllTraffic(true);
  };
  const handleShowMoreSchool = () =>{
    setShowAllSchool(true);
  };
  const handleShowMoreNoise = () =>{
    setShowAllNoise(true);
  };
  const handleShowMoreParking = () =>{
    setShowAllParking(true);
  };

  /*
  const [activateTyping, setActivateTyping] = useState(false);
  const [text,setText] = useTypewriter({
    words: ['hello' , 'worlds'],
    loop: false
  });

  useEffect(()=> {
    if(renderState === 'StartPage' || renderState === 'aptPrice'){
      setActivateTyping(true);
      console.log("true");
      
      setText({
        words: ['update', 'complete'],
        loop: 1
      })
    }else{
      setActivateTyping(false);
      console.log("false");
    }
  },[renderState])
  */

  const divClassName = isDivClickable ? 'abcdefGPT-result-tab clickable-div white-bg' : 'abcdefGPT-result-tab hidden-div';

  const title = document.title;
  const matches = title.match(/'([^']+)'/);

  const tmpAptCode = document.URL
  const [aptCode, setAptCode] =useState('');

  useEffect(()=>{
    const parts = tmpAptCode.split('/');
    const desiredPart = parts[4];

    setAptCode(desiredPart);
  }, []);
  
  const tmpAptName = document.title;
  const [aptName, setAptName] = useState('');

  useEffect(()=>{
    const parts = tmpAptName.split('\'');
    const desiredPart = parts[1];

    setAptName(desiredPart);
  }, []);
  console.log(aptName);

  const divRef = useRef(null);
  const [inputText , setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  }

  const handleButtonClick = () => {
    if(inputText){
      setMessages([...messages, inputText]);
      setInputText('');
    }
    if(divRef.current) {
      const divHeight = divRef.current.offsetHeight;
      window.scrollBy({top: divHeight, behavior:'smooth'});
    }
  };

  const handleConfirmButtonClick = async () => { //클릭 처리
    console.log(inputText); 

    try{
    const data = {
      message: inputText
    };

    const response = await fetch('https://abcdefgpt.site/get_answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }); 
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const result = await response.json(); // JSON 형태의 응답을 파싱
    const answer = result[0].answer
    setMessages(prevResponse=> [...prevResponse, answer]); // 서버 응답을 상태에 저장
    console.log(answer);
  } catch (error) {
    console.error('서버로부터 응답을 받는데 실패했습니다:', error);
    setMessages(prevResponse=> [...prevResponse,'서버로부터 응답을 받는데 실패했습니다.']);
    }
  }

  const [visibleName, setvisibleName] = useState(true)
  
  const visibleHandler = () =>{
    setvisibleName(false);
  }

  const handlePrint = () =>{
    handleButtonClick();
    handleConfirmButtonClick();
    visibleHandler();
  }

  const aptURL = "https://abcdefgpt.site/getdata?apt_code="+aptCode+"&apt_name="+aptName

  const TestData = useFetch(aptURL);
  if(TestData !== undefined && TestData !== null && TestData.length){
    console.log(TestData);
  }

  

  const [sqIsActive, setSqIsActive] = useState('');

  const handleSqClick = (itemName) =>{
    setSqIsActive(itemName);
  }
  

  //Loading Page

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
  }
  
  /* Start Page */
  
  else if(renderState==='StartPage'){
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
                </ul>
              </div>
              <div className='aptPrice'>
                <div className='content_header'>
                  <img src="https://i.imgur.com/lYgSkrc.jpg" alt="logo"/>
                  <a>아파트 거래 분석</a>
                </div>
                <div className='content_main'>
                  <div className='custom-scroll-menu-container'>
                    <ul>
                     {TestData.trades.map((item)=>(
                      <li
                        key={item.apt_sq}
                        className={(item.apt_sq===sqIsActive ? 'menu-active' : '')}  
                        onClick={()=>handleSqClick(item.apt_sq)}                 
                      >
                        <a>{item.apt_sq}평</a>
                      </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                      {TestData.trades.map((item)=>(
                        <div 
                          key={item.apt_sq}
                          className={item.apt_sq==sqIsActive ? 'info-active': 'info-hidden'}
                        >
                          <ul>
                            {/*
                          <li className='apt-price-frame'>
                            <p className='apt-price-topic'>아파트 평수</p>
                            <p>{item.apt_sq}</p>
                          </li>
                      */}
                          <li className='apt-price-frame'>
                            <p className='apt-price-topic'>아파트 평균 가격</p>
                            <p>{item.avg_price}</p>
                          </li>
                          <li className='apt-price-frame'>
                            <p className='apt-price-topic'>최근 상위 30% 층 가격</p>
                            <p>{item.recent_top}</p>
                          </li>
                          <li className='apt-price-frame'>
                            <p className='apt-price-topic'>아파트 하위 30% 층 가격</p>
                            <p>{item.bottom_avg_price}</p>
                          </li>
                          <li className='apt-price-frame'>
                            <p className='apt-price-topic'>아파트 가격 동향</p>
                            <p>{item.price_trend}</p>
                          </li>
                          <li className='apt-price-frame'>
                            <p className='apt-price-topic'>아파트 최근 평균</p>
                            <p>{item.recent_avg}</p>
                          </li>
                          <li className='apt-price-frame'>
                            <p className='apt-price-topic'>최근 아파트 상위 30% 층 가격</p>
                            <p>{item.top_avg_price}</p>
                          </li>
                          <li className='apt-price-frame'>
                            <p className='apt-price-topic'>최근 아파트 하위 30% 층 가격</p>
                            <p>{item.recent_bottom}</p>
                          </li>
                          <li className='apt-price-frame'>
                            <p className='apt-price-topic'>거래량 동향</p>
                            <p>{item.trade_trend}</p>
                          </li>
                          </ul>
                        </div>
                      ))}
                  </div>


                  {/*<h1 className='typing'>
                    {TestData ? <div>{JSON.stringify(TestData.trades)}</div> : <p>Loading...</p>}
    </h1>*/}

                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
  
  /*analyze apartment comment page */
  
  else if(renderState==='aptComment'){
    return (
      <div ref={divRef} className='custom-tab'>
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
                      <ul className='reviews'>
                        {TestData.reviews
                        .filter(item => item.category === "1")
                        .map((item,index)=>(
                          <li 
                            className='comments'
                            key={index}
                            style={{display: index < 2 || showAllEnv ? 'block' : 'none'}}
                          >
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews
                        .filter(item => item.category === "1").length > 2 &&
                        !showAllEnv && <button onClick={handleShowMoreEnv}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>커뮤니티</a>
                      <ul className='reviews'>
                      {TestData.reviews
                        .filter(item => item.category === "2")
                        .map((item,index)=>(
                          <li 
                            className='comments'
                            key={index}
                            style={{display: index < 2 || showAllComm ? 'block' : 'none'}}
                          >
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews
                        .filter(item => item.category === "2").length > 2 &&
                        !showAllComm && <button onClick={handleShowMoreComm}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>동별특징</a>
                      <ul className='reviews'>
                      {TestData.reviews
                        .filter(item => item.category === "3")
                        .map((item,index)=>(
                          <li 
                            className='comments'
                            key={index}
                            style={{display: index < 2 || showAllAptChar ? 'block' : 'none'}}
                          >
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews
                        .filter(item => item.category === "7").length > 3 &&
                        !showAllAptChar && <button onClick={handleShowMoreAptChar}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>주변상권</a>
                      <ul className='reviews'>
                      {TestData.reviews
                        .filter(item => item.category === "4")
                        .map((item,index)=>(
                          <li 
                            className='comments'
                            key={index}
                            style={{display: index < 2 || showAllStore ? 'block' : 'none'}}
                          >
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews
                        .filter(item => item.category === "7").length > 4 &&
                        !showAllStore && <button onClick={handleShowMoreStore}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>교통</a>
                      <ul className='reviews'>
                      {TestData.reviews
                        .filter(item => item.category === "5")
                        .map((item,index)=>(
                          <li 
                            className='comments'
                            key={index}
                            style={{display: index < 2 || showAllTraffic ? 'block' : 'none'}}
                          >
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews
                        .filter(item => item.category === "5").length > 2 &&
                        !showAllTraffic && <button onClick={handleShowMoreTraffic}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>학군</a>
                      <ul className='reviews'>
                      {TestData.reviews
                        .filter(item => item.category === "6")
                        .map((item,index)=>(
                          <li 
                            className='comments'
                            key={index}
                            style={{display: index < 2 || showAllSchool ? 'block' : 'none'}}
                          >
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews
                        .filter(item => item.category === "6").length > 2 &&
                        !showAllSchool && <button onClick={handleShowMoreSchool}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>소음</a>
                      <ul className='reviews'>
                      {TestData.reviews
                        .filter(item => item.category === "7")
                        .map((item,index)=>(
                          <li 
                            className='comments'
                            key={index}
                            style={{display: index < 2 || showAllNoise ? 'block' : 'none'}}
                          >
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews
                        .filter(item => item.category === "7").length > 2 &&
                      !showAllNoise && <button onClick={handleShowMoreNoise}>더보기</button>}
                    </li>
                    <li className='topic'>
                      <a>주차</a>
                      <ul className='reviews'>
                      {TestData.reviews
                        .filter(item => item.category === "0")
                        .map((item,index)=>(
                          <li 
                            className='comments'
                            key={index}
                            style={{display: index < 2 || showAllParking ? 'block' : 'none'}}
                          >
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews
                        .filter(item => item.category === "0").length > 2 &&
                        !showAllParking && <button onClick={handleShowMoreParking}>더보기</button>}
                    </li>
                  </ul>
                </div>
              </div>
          </div>
              
        </div>
      </div>
    );
  }
  
  /*analyze seoul price page */
  
  else if(renderState==='seoulPrice'){
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
                  <div className='content_box'>
                    <div className='seoulQ'>
                      <img src="https://i.imgur.com/G77v4vj.jpg"></img>
                      <a>8월과 9월 사이에 거래량의 비율이 가장 많이 감소한 위치와 몇퍼센트인지 알려줘</a>
                    </div>
                    <div className='seoulA'>
                      <img src="https://i.imgur.com/ykkBbKw.png"></img>
                      <a>거래량이 가장 많이 감소한 위치는 '강북구'이며, 감소율은 약 73.66%입니다.</a>
                    </div>
                  </div>
                  <div className='content_box'>
                    <div className='seoulQ'>
                      <img src="https://i.imgur.com/G77v4vj.jpg"></img>
                      <a>23년 들어서 거래량의 방향성은 어때? 완결된 한국어 문장으로 대답해줘</a>
                    </div>
                    <div className='seoulA'>
                      <img src="https://i.imgur.com/ykkBbKw.png"></img>
                      <a>23년에 들어서 거래량은 대체로 증가하는 추세를 보였습니다. 1월에 1411건에서 시작하여 6월에는 3845건으로 증가하였습니다. 그 후 7월에는 약간 감소하였지만, 8월에는 다시 증가하여 3852건을 기록하였습니다. 그러나 9월에는 다시 감소하여 3360건을 기록하였습니다.</a>
                    </div>
                  </div>
                  <div className='GPT_container'>
                    {visibleName && (
                      <h1 id='gptname'>abcdefGPT</h1>
                    )}   
                    <div>
                      {messages.map((message,index)=>(
                        <div key = {index}>{message}</div>
                      ))}
                    </div>
                    <div className='Msg_send'>
                      <input type='text' className='Msg_area' id='Msg_area' placeholder='거래량 분석 질문하기' value={inputText} onChange={handleInputChange}></input>
                      <button onClick={handlePrint}>
                        보내기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
              
        </div>
      </div>
    );
  }


  
  /*ChatGPT API page*/
  /*
  else if(renderState==='chatGPT'){
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
                  
                </div>
              </div>
          </div>
              
        </div>
      </div>
    );
  }
 */
  /*AI apartment recommand page*/
/*
  else if(renderState==='aiRecommend'){
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
  */
  
};
export default AbcdefGPT;
