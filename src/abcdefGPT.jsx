import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import SearchTabContent from './searchTabContent.jsx'
import {Oval} from "react-loader-spinner";
import './abcdefGPT.css';
import useFetch from './usefetch';
import { Typewriter } from 'react-simple-typewriter'


function AbcdefGPT() {
  const [isDivClickable, setIsDivClickable] = useState(false);
  const [userInput, setUserInput] = useState(''); // 사용자 입력 상태 추가
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [renderState, setRenderState] = useState('initial');
  const [showAllEnv, setShowAllEnv] = useState(2);
  const [showAllComm, setShowAllComm] = useState(2);
  const [showAllAptChar, setShowAllAptChar] = useState(2);
  const [showAllStore, setShowAllStore] = useState(2);
  const [showAllTraffic, setShowAllTraffic] = useState(2);
  const [showAllSchool, setShowAllSchool] = useState(2);
  const [showAllNoise, setShowAllNoise] = useState(2);
  const [showAllParking, setShowAllParking] = useState(2);
  const divRef = useRef(null);
  const [inputText , setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const title = document.title;
  const matches = title.match(/'([^']+)'/);
  const tmpAptCode = document.URL
  const [aptCode, setAptCode] =useState('');
  const tmpAptName = document.title;
  const [aptName, setAptName] = useState('');
  const [visibleName, setvisibleName] = useState(true);
  const [sqIsActive, setSqIsActive] = useState('');
  const [visibleLoading, setVisibleLoading] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);



  const toggleDivClickability = () => {
    setIsDivClickable(!isDivClickable);
    if(renderState === 'initial'){
      const timer = setTimeout(() => {
        if(TestData && TestData.trades.length>0){
          setRenderState('StartPage');
        
          setSqIsActive(TestData.trades[0].apt_sq)
        }else{
          setRenderState('aptList')
        }
        
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

  const handleClick_aptList =() =>{
    setRenderState('aptList')
  };

  const handleClick_seoulPrice2 =() =>{
    setRenderState('seoulPrice2')
  };

  const handleShowMoreEnv = () =>{
    setShowAllEnv(TestData.reviews.filter(item => item.category==="1").length);
  };
  const handleShowLessEnv = () =>{
    setShowAllEnv(2);
  };
  const handleShowMoreComm = () =>{
    setShowAllComm(TestData.reviews.filter(item => item.category==="2").length);
  };
  const handleShowLessComm = () =>{
    setShowAllComm(2);
  };
  const handleShowMoreAptChar = () =>{
    setShowAllAptChar(TestData.reviews.filter(item => item.category==="3").length);
  };
  const handleShowLessAptChar = () =>{
    setShowAllAptChar(2);
  };
  const handleShowMoreStore = () =>{
    setShowAllStore(TestData.reviews.filter(item => item.category==="4").length);
  };
  const handleShowLessStore = () =>{
    setShowAllStore(2);
  };
  const handleShowMoreTraffic = () =>{
    setShowAllTraffic(TestData.reviews.filter(item => item.category==="5").length);
  };
  const handleShowLessTraffic = () =>{
    setShowAllTraffic(2);
  };
  const handleShowMoreSchool = () =>{
    setShowAllSchool(TestData.reviews.filter(item => item.category==="6").length);
  };
  const handleShowLessSchool = () =>{
    setShowAllSchool(2);
  };
  const handleShowMoreNoise = () =>{
    setShowAllNoise(TestData.reviews.filter(item => item.category==="7").length);
  };
  const handleShowLessNoise = () =>{
    setShowAllNoise(2);
  };
  const handleShowMoreParking = () =>{
    setShowAllParking(TestData.reviews.filter(item => item.category==="0").length);
  };
  const handleShowLessParking = () =>{
    setShowAllParking(2);
  };

  const divClassName = isDivClickable ? 'abcdefGPT-result-tab clickable-div white-bg' : 'abcdefGPT-result-tab hidden-div';

  useEffect(()=>{
    const parts = tmpAptCode.split('/');
    const desiredPart = parts[4];

    setAptCode(desiredPart);
  }, []);

  useEffect(()=>{
    const parts = tmpAptName.split('\'');
    const desiredPart = parts[1];

    setAptName(desiredPart);
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  }

  const handleButtonClick = () => {
    if(inputText){
      setMessages([...messages, inputText]);
      setInputText('');
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
    setVisibleLoading(false);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const result = await response.json(); // JSON 형태의 응답을 파싱
    const answer = result[0].answer;
    setMessages(prevResponse=> [...prevResponse, answer]); // 서버 응답을 상태에 저장
    console.log(answer);
  } catch (error) {
    console.error('서버로부터 응답을 받는데 실패했습니다:', error);
    setVisibleLoading(false);
    setMessages(prevResponse=> [...prevResponse,'서버로부터 응답을 받는데 실패했습니다.']);
    }
  }

  const visibleHandler = () =>{
    setvisibleName(false);
  }

  const handleGptKeyDown = (event) =>{
    if(event.key === 'Enter'){
      if(event.nativeEvent.isComposing){
        handlePrint();
      }
      else{
        setInputText('');
      }
    }
  }

  const handlePrint = () =>{
    setVisibleLoading(true);
    handleButtonClick();
    handleConfirmButtonClick();
    visibleHandler();
  }

  const aptURL = "https://abcdefgpt.site/getdata?apt_code="+aptCode+"&apt_name="+aptName

  const TestData = useFetch(aptURL);
  if(TestData !== undefined && TestData !== null && TestData.length){
    console.log(TestData);
  }


  const handleSqClick = (itemName) =>{
    setSqIsActive(itemName);
  }

  const allAptURL = "https://abcdefgpt.site:/get/all-name"

  const allApt = useFetch(allAptURL);

  const renderTextwithNumbersRed = (text) =>{
    const parts = text.split(/(\d+)/).map((part,index)=>{
      if (!isNaN(part)){
        return <span key={index} style={{color:'red', fontWeight:'bold'}}>{part}</span>
      }
      return part;
    })
    return <p>{parts}</p>
  }

  const handleMouseEnter = () => {
    setButtonHover(true);
  };

  // 마우스가 버튼에서 벗어날 때 호출될 함수
  const handleMouseLeave = () => {
    setButtonHover(false);
  };

  const buttonStyle = {
    textDecoration: buttonHover ? 'underline': 'none',
  };

  const toggleNewTab = () => {
    const parentDiv = document.querySelector('.abcdefGPT-result-tab').parentNode;
    const newDivName = 'search-tab-div';
    let newTabDiv = parentDiv.querySelector(`div[name="${newDivName}"]`);

    if (!newTabDiv) {
      newTabDiv = document.createElement('div');
      newTabDiv.setAttribute('name', newDivName);
      parentDiv.appendChild(newTabDiv);

      const reactRoot = createRoot(newTabDiv);
      reactRoot.render(<SearchTabContent />);
    }

    if(!isDivClickable) {
      if(!(newTabDiv.classList.contains('hidden-div')))
      newTabDiv.classList.add('hidden-div');
    } else {
      if(newTabDiv.classList.contains('hidden-div')){
        newTabDiv.classList.remove('hidden-div');
      } else {
        newTabDiv.classList.add('hidden-div');
      }
    }
  };

  useEffect(() => {
    if (!isDivClickable) {
      toggleNewTab();
    }
  }, [isDivClickable]);


  //Loading Page

  if(renderState==='initial'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          abcdefGPT 아파트 분석
        </button>
        <div style={{position:'absolute', left:'375px', top:'-190px'}} className={divClassName}>
          <div className='apt_name'>
            <h3>{matches[1]}</h3>
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
  }
  
  /* Start Page */
  
  else if(renderState==='StartPage'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          abcdefGPT 아파트 분석
        </button>
        <div style={{position:'absolute', left:'375px', top:'-190px'}} className={divClassName}>
          <div className='custom-header'>
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
              <button className='search-button' onClick={toggleNewTab} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              <button className='close-button' onClick={toggleDivClickability}>
                <span className='css-33lnss'>
                      <span className='css-1oc9vj8'>
                          <svg viewBox='0 0 30 30' width="22" height="22" className='css-14vv9id' xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1 L21 21 M21 1 L1 21"/>
                          </svg>
                      </span>
                  </span>
              </button>
          </div>
          <div className='custom-content'>
              <div className='menu_bar'>
                <ul>
                  <li style={{backgroundColor: '#5963D9',border: '1px solid #5963d9'}}>
                    <a style={{color:'white'}} onClick={handleClick_aptPrice}>아파트 거래 분석</a>
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
                  <a>아파트 거래 분석</a><a style={{fontSize:'10px', marginLeft:'20px'}}>※최근 1년 실거래를 분석한 결과입니다.</a>
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
                  <div style={{marginTop:'10px'}}>
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
                            <div className='apt-price-info'>
                              <p className='apt-price-topic'>평균 가격</p>
                            </div>
                            {renderTextwithNumbersRed(item.avg_price)}
                          </li>
                          <li className='apt-price-frame'>
                            <div className='apt-price-info'>
                            <p className='apt-price-topic'>고층 평균 가격</p>
                            </div>
                            {renderTextwithNumbersRed(item.top_avg_price)}
                          </li>
                          <li className='apt-price-frame'>
                            <div className='apt-price-info'>
                            <p className='apt-price-topic'>저층 평균 가격</p>
                            </div>
                            {renderTextwithNumbersRed(item.bottom_avg_price)}
                            
                          </li>
                          <li className='apt-price-frame'>
                            <div className='apt-price-info'>
                            <p className='apt-price-topic'>거래량 동향</p>
                            </div>
                            {renderTextwithNumbersRed(item.trade_trend)}
                           
                          </li>
                          <li className='apt-price-frame'>
                            <div className='apt-price-info'>
                            <p className='apt-price-topic'>최근 평균 가격</p>
                            </div>
                            {renderTextwithNumbersRed(item.recent_avg)}
                           
                          </li>
                          <li className='apt-price-frame'>
                          <div className='apt-price-info'>
                            <p className='apt-price-topic'>최고가 대비 최근가격</p>
                            </div>
                            {renderTextwithNumbersRed(item.recent_top)}
                            
                          </li>
                          <li className='apt-price-frame'>
                          <div className='apt-price-info'>
                            <p className='apt-price-topic'>최저가 대비 최근가격 </p>
                            </div>
                            {renderTextwithNumbersRed(item.recent_bottom)}
                            
                          </li>
                          <li className='apt-price-frame'>
                          <div className='apt-price-info'>
                            <p className='apt-price-topic'>가격 동향</p>
                            </div>
                            {renderTextwithNumbersRed(item.price_trend)}
                            
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
        <button className='custom-button' onClick={toggleDivClickability} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          abcdefGPT 아파트 분석
        </button>
        <div style={{position:'absolute', left:'375px', top:'-190px'}} className={divClassName}>
          <div className='custom-header'>
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
              <button className='close-button' onClick={toggleDivClickability}>
              <span className='css-33lnss'>
                      <span className='css-1oc9vj8'>
                          <svg viewBox='0 0 30 30' width="22" height="22" className='css-14vv9id' xmlns="http://www.w3.org/2000/svg">
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
                  <li style={{backgroundColor: '#5963D9',border: '1px solid #5963d9'}}>
                    <a style={{color:'white'}} onClick={handleClick_aptComment}>아파트 후기 분석</a>
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
                        {TestData.reviews.filter(item => item.category ==="1").slice(0,showAllEnv)
                        .map((item, index)=>(
                          <li
                            className='comments' 
                            key={index}>
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews.filter(item => item.category==="1").length >showAllEnv ?(
                        <button onClick={handleShowMoreEnv}>더보기</button>
                      ):(
                        <button onClick={handleShowLessEnv}>접기</button>
                      )}
                    </li>
                    <li className='topic'>
                    <a>커뮤니티</a>
                      <ul className='reviews'>
                        {TestData.reviews.filter(item => item.category ==="2").slice(0,showAllComm)
                        .map((item, index)=>(
                          <li
                            className='comments' 
                            key={index}>
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews.filter(item => item.category==="2").length >showAllComm ?(
                        <button onClick={handleShowMoreComm}>더보기</button>
                      ):(
                        <button onClick={handleShowLessComm}>접기</button>
                      )}
                      
                    </li>
                    <li className='topic'>
                      <a>동별특징</a>
                      <ul className='reviews'>
                        {TestData.reviews.filter(item => item.category ==="3").slice(0,showAllAptChar)
                        .map((item, index)=>(
                          <li
                            className='comments' 
                            key={index}>
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews.filter(item => item.category==="3").length >showAllAptChar ?(
                        <button onClick={handleShowMoreAptChar}>더보기</button>
                      ):(
                        <button onClick={handleShowLessAptChar}>접기</button>
                      )}
                    </li>
                    <li className='topic'>
                      <a>주변상권</a>
                      <ul className='reviews'>
                        {TestData.reviews.filter(item => item.category ==="4").slice(0,showAllStore)
                        .map((item, index)=>(
                          <li
                            className='comments' 
                            key={index}>
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews.filter(item => item.category==="4").length >showAllStore ?(
                        <button onClick={handleShowMoreStore}>더보기</button>
                      ):(
                        <button onClick={handleShowLessStore}>접기</button>
                      )}
                    </li>
                    <li className='topic'>
                      <a>교통</a>
                      <ul className='reviews'>
                        {TestData.reviews.filter(item => item.category ==="5").slice(0,showAllTraffic)
                        .map((item, index)=>(
                          <li
                            className='comments' 
                            key={index}>
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews.filter(item => item.category==="5").length >showAllTraffic ?(
                        <button onClick={handleShowMoreTraffic}>더보기</button>
                      ):(
                        <button onClick={handleShowLessTraffic}>접기</button>
                      )}
                    </li>
                    <li className='topic'>
                      <a>학군</a>
                      <ul className='reviews'>
                        {TestData.reviews.filter(item => item.category ==="6").slice(0,showAllSchool)
                        .map((item, index)=>(
                          <li
                            className='comments' 
                            key={index}>
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews.filter(item => item.category==="6").length >showAllSchool ?(
                        <button onClick={handleShowMoreSchool}>더보기</button>
                      ):(
                        <button onClick={handleShowLessSchool}>접기</button>
                      )}
                    </li>
                    <li className='topic'>
                      <a>소음</a>
                      <ul className='reviews'>
                        {TestData.reviews.filter(item => item.category ==="7").slice(0,showAllNoise)
                        .map((item, index)=>(
                          <li
                            className='comments' 
                            key={index}>
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews.filter(item => item.category==="7").length >showAllNoise ?(
                        <button onClick={handleShowMoreNoise}>더보기</button>
                      ):(
                        <button onClick={handleShowLessNoise}>접기</button>
                      )}
                    </li>
                    <li className='topic'>
                      <a>주차</a>
                      <ul className='reviews'>
                        {TestData.reviews.filter(item => item.category ==="0").slice(0,showAllParking)
                        .map((item, index)=>(
                          <li
                            className='comments' 
                            key={index}>
                            <a>{item.review}</a>
                          </li>
                        ))}
                      </ul>
                      {TestData.reviews.filter(item => item.category==="0").length >showAllParking ?(
                        <button onClick={handleShowMoreParking}>더보기</button>
                      ):(
                        <button onClick={handleShowLessParking}>접기</button>
                      )}
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
        <button className='custom-button' onClick={toggleDivClickability} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          abcdefGPT 아파트 분석
        </button>
        <div style={{position:'absolute', left:'375px', top:'-190px'}} className={divClassName}>
          <div className='custom-header'>
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
              <button className='close-button' onClick={toggleDivClickability}>
                <span className='css-33lnss'>
                      <span className='css-1oc9vj8'>
                          <svg viewBox='0 0 30 30' width="22" height="22" className='css-14vv9id' xmlns="http://www.w3.org/2000/svg">
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
                  <li style={{backgroundColor: '#5963D9',border: '1px solid #5963d9'}}>
                    <a style={{color:'white'}} onClick={handleClick_seoulPrice}>서울시 거래량 분석</a>
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
                      <div style={{display:'inline', width:'270px'}}>
                        <a style={{color : '#FF0000'}}>'중랑구'</a><a>에서 8월에서 9월 사이에 거래량이 </a><a style={{color : '#FF0000'}}>약 42.86% 상승</a><a>했습니다.</a>
                      </div>
                      
                    </div>
                  </div>
                  <div className='content_box'>
                    <div className='seoulQ'>
                      <img src="https://i.imgur.com/G77v4vj.jpg"></img>
                      <a>8월과 9월 사이에 거래량의 비율이 가장 많이 감소한 위치와 몇퍼센트인지 알려줘</a>
                    </div>
                    <div className='seoulA'>
                      <img src="https://i.imgur.com/ykkBbKw.png"></img>
                      <div style={{display:'inline', width:'270px'}}>
                        <a>거래량이 가장 많이 감소한 위치는 </a><a style={{color : '#FF0000'}}>'강북구'</a>이며, 감소율은 <a style={{color : '#FF0000'}}>약 73.66%</a><a>입니다.</a>
                      </div>
                    </div>
                  </div>
                  <div className='content_box'>
                    <div className='seoulQ'>
                      <img src="https://i.imgur.com/G77v4vj.jpg"></img>
                      <a>23년 들어서 거래량의 방향성은 어때?</a>
                    </div>
                    <div className='seoulA'>
                      <img src="https://i.imgur.com/ykkBbKw.png"></img>
                      <div style={{display:'inline', width:'270px'}}>
                        <a>23년에 들어서 거래량은 대체로 </a><a style={{color : '#FF0000'}}>증가</a><a>하는 추세를 보였습니다. 1월에 </a><a style={{color : '#FF0000'}}>1411건</a><a>에서 시작하여 6월에는 </a><a  style={{color : '#FF0000'}}>3845건</a><a>으로 증가하였습니다. 그 후 7월에는 약간 </a><a  style={{color : '#FF0000'}}>감소</a><a>하였지만, 8월에는 다시 증가하여 </a><a style={{color : '#FF0000'}}>3852건</a><a>을 기록하였습니다. 그러나 9월에는 다시 감소하여 </a><a style={{color : '#FF0000'}}>3360건</a><a>을 기록하였습니다.</a>
                      </div>
                    </div>
                  </div>
                  <div className='GPT_container'>
                    {visibleName && (
                      <h1 id='gptname'>abcdefGPT</h1>
                    )}   
                    <div className='GPT_Conv'>
                      {messages.map((message,index)=>(
                        <div key = {index}>
                          <a>{message}</a>
                        </div>
                      ))}
                    </div>
                    <div>
                      {visibleLoading &&(
                        <div className='loading-gpt'>
                          
                          <div className='gif-image'>
                            <Oval
                              color="#584de4"
                              height={50}
                              width={50}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{height:'10px'}}></div>
                    <div className='Msg_send'>
                      <input type='text' className='Msg_area' id='Msg_area' placeholder='거래량 분석 질문하기' value={inputText} onKeyDown={handleGptKeyDown} onChange={handleInputChange}></input>
                      <button className='Msg_Btn' onClick={handlePrint}>
                        <img src='https://i.imgur.com/QtJ2sSp.png'/>
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
  
  else if(renderState==='aptList'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          abcdefGPT 아파트 분석
        </button>
        <div style={{position:'absolute', left:'375px', top:'-190px'}} className={divClassName}>
          <div className='custom-header'>
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
              <button className='close-button' onClick={toggleDivClickability}>
              <span className='css-33lnss'>
                      <span className='css-1oc9vj8'>
                          <svg viewBox='0 0 30 30' width="22" height="22" className='css-14vv9id' xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1 L21 21 M21 1 L1 21"/>
                          </svg>
                      </span>
                  </span>
              </button>
          </div>
          <div className='custom-content'>
            <div className='menu_bar'>
                <ul>
                  <li style={{backgroundColor: '#5963D9',border: '1px solid #5963d9'}}>
                    <a style={{color:'white'}} onClick={handleClick_aptList}>제공되는 아파트</a>
                  </li>
                  <li>
                    <a onClick={handleClick_seoulPrice2}>서울시 거래량 분석</a>
                  </li>
                </ul>
            </div>
              <div className='noDataInfo'>
                <h3 style={{borderBottom:"1px solid #f3f3f3", padding:'10px 0px'}}>
                  해당 아파트는 정보가 제공되지 않습니다.
                </h3>
                <br></br>
                <h3>
                  제공되는 아파트는 다음과 같습니다.
                </h3>
                <ul className='allAptInfo'>
                  {allApt.map((item)=>(
                    <li>
                      <a>{item.apt_name}</a>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
              
        </div>
      </div>
    );
  }
  else if(renderState==='seoulPrice2'){
    return (
      <div className='custom-tab'>
        <button className='custom-button' onClick={toggleDivClickability} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          abcdefGPT 아파트 분석
        </button>
        <div style={{position:'absolute', left:'375px', top:'-190px'}} className={divClassName}>
          <div className='custom-header'>
              <div className='apt_name'>
                <h3>{matches[1]}</h3>
              </div>
              <button className='close-button' onClick={toggleDivClickability}>
              <span className='css-33lnss'>
                      <span className='css-1oc9vj8'>
                          <svg viewBox='0 0 30 30' width="22" height="22" className='css-14vv9id' xmlns="http://www.w3.org/2000/svg">
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
                    <a onClick={handleClick_aptList}>제공되는 아파트</a>
                  </li>
                  <li style={{backgroundColor: '#5963D9',border: '1px solid #5963d9'}}>
                    <a style={{color:'white'}} onClick={handleClick_seoulPrice2}>서울시 거래량 분석</a>
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
                      <div style={{display:'inline', width:'270px'}}>
                        <a style={{color : '#FF0000'}}>'중랑구'</a><a>에서 8월에서 9월 사이에 거래량이 </a><a style={{color : '#FF0000'}}>약 42.86% 상승</a><a>했습니다.</a>
                      </div>
                      
                    </div>
                  </div>
                  <div className='content_box'>
                    <div className='seoulQ'>
                      <img src="https://i.imgur.com/G77v4vj.jpg"></img>
                      <a>8월과 9월 사이에 거래량의 비율이 가장 많이 감소한 위치와 몇퍼센트인지 알려줘</a>
                    </div>
                    <div className='seoulA'>
                      <img src="https://i.imgur.com/ykkBbKw.png"></img>
                      <div style={{display:'inline', width:'270px'}}>
                        <a>거래량이 가장 많이 감소한 위치는 </a><a style={{color : '#FF0000'}}>'강북구'</a>이며, 감소율은 <a style={{color : '#FF0000'}}>약 73.66%</a><a>입니다.</a>
                      </div>
                    </div>
                  </div>
                  <div className='content_box'>
                    <div className='seoulQ'>
                      <img src="https://i.imgur.com/G77v4vj.jpg"></img>
                      <a>23년 들어서 거래량의 방향성은 어때?</a>
                    </div>
                    <div className='seoulA'>
                      <img src="https://i.imgur.com/ykkBbKw.png"></img>
                      <div style={{display:'inline', width:'270px'}}>
                        <a>23년에 들어서 거래량은 대체로 </a><a style={{color : '#FF0000'}}>증가</a><a>하는 추세를 보였습니다. 1월에 </a><a style={{color : '#FF0000'}}>1411건</a><a>에서 시작하여 6월에는 </a><a  style={{color : '#FF0000'}}>3845건</a><a>으로 증가하였습니다. 그 후 7월에는 약간 </a><a  style={{color : '#FF0000'}}>감소</a><a>하였지만, 8월에는 다시 증가하여 </a><a style={{color : '#FF0000'}}>3852건</a><a>을 기록하였습니다. 그러나 9월에는 다시 감소하여 </a><a style={{color : '#FF0000'}}>3360건</a><a>을 기록하였습니다.</a>
                      </div>
                    </div>
                  </div>
                  <div className='GPT_container'>
                    {visibleName && (
                      <h1 id='gptname'>abcdefGPT</h1>
                    )}   
                    <div className='GPT_Conv'>
                      {messages.map((message,index)=>(
                        <div key = {index}>
                          <a>{message}</a>
                        </div>
                      ))}
                    </div>
                    <div>
                      {visibleLoading &&(
                        <div className='loading-gpt'>
                          
                          <div className='gif-image'>
                            <Oval
                              color="#584de4"
                              height={50}
                              width={50}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{height:'10px'}}></div>
                    <div className='Msg_send'>
                      <input type='text' className='Msg_area' id='Msg_area' placeholder='거래량 분석 질문하기' value={inputText} onKeyDown={handleGptKeyDown} onChange={handleInputChange}></input>
                      <button className='Msg_Btn' onClick={handlePrint}>
                        <img src='https://i.imgur.com/QtJ2sSp.png'/>
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
