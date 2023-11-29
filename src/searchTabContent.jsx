import React, { useState, useEffect, useRef } from 'react';
import './searchTabContent.css';

function SearchTabContent() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [AptData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sqIsActive, setSqIsActive] = useState('');
  const searchTabRef = useRef();

  const fetchSearchResults = async () => {
    try {
      const response = await fetch('https://abcdefgpt.site/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: searchQuery }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const AptData = await response.json();
      setSearchResults(AptData);
    } catch (error) {
      console.error("Fetching search results failed: ", error);
    }
  };

  const handleKeyPress = (e) => { //when entered enter
    if (e.key === 'Enter') {
      fetchSearchResults();
    }
  };

  useEffect(() => { //when change search query
    const delayDebounce = setTimeout(() => {
      fetchSearchResults();
    }, 500); // 500ms의 디바운스 시간

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    fetchSearchResults();
  };

  const handleItemClick = (aptCode, aptName) => { //요소를 클릭했을 때
    console.log(`apt_code: ${aptCode}, apt_name: ${aptName}`);
    setSearchQuery(aptName);
    fetchData(aptCode, aptName);
    setShowResults(false);
  };

  const renderTextwithNumbersRed = (text) => {
    const parts = text.split(/(\d+)/).map((part, index) => {
      if (!isNaN(part)) {
        return <span key={index} style={{ color: 'red', fontWeight: 'bold' }}>{part}</span>
      }
      return part;
    })
    return <p>{parts}</p>
  }

  const fetchData = async (aptCode, aptName) => {
    setIsLoading(true);
    try {
      const encodedAptName = encodeURIComponent(aptName);
      const url = `https://abcdefgpt.site/getdata?apt_code=${aptCode}&apt_name=${encodedAptName}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Fetching AptData failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (AptData) {
      setSqIsActive(AptData.trades[0].apt_sq);
      console.log(AptData);
    }
  }, [AptData]);


  const divClassName = 'search-tab clickable-div white-bg'

  const handleClose = () => {
    const parentDiv = document.querySelector('.search-tab').parentNode;
    if (parentDiv) {
      parentDiv.classList.add('hidden-div');
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchTabRef.current && !searchTabRef.current.contains(event.target)) {
        setShowResults(false); // 외부 클릭 감지
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchTabRef]);

  //close icon click
  const clearSearchInput = () => {
    setSearchQuery(''); // clear
    setShowResults(false);
  };

  const handleSqClick = (itemName) => {
    setSqIsActive(itemName);
  }

  return (
    <div style={{ position: 'absolute', left: '750px', top: '-190px' }} className={divClassName}>
      <div className="search-tab-blew" ref={searchTabRef}>
        <div className="search-input-container" onClick={() => setShowResults(true)}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder="아파트, 지역 또는 학교명으로 검색"
            className="search-input"
          />
          <div className='icon-container'>
            {searchQuery && (
              <button onClick={clearSearchInput} className="close-icon" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                <svg width="19" height="19" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#D3D3D3" />
                  <path d="M9 9l6 6m0-6l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
            <button className='search-icon' onClick={handleSearch} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="6"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
        {showResults && (
          <div className="search-results"> {/*외부 누르면 이 창 사라지게*/}
            {searchResults.map((result) => (
              <div
                key={result.apt_code}
                onClick={() => handleItemClick(result.apt_code, result.apt_name)}
                className="search-item"
              >
                {result.apt_name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='search-content'>
        {isLoading && <div>Loading...</div>}
        {!isLoading && !AptData && (
          <div className="centered-message">검색 결과를 통해 비교해보세요!</div>
        )}
        {AptData && (
          <div>
            <div className='custom-header'>
              <div className='apt_name'>
                <h3>{AptData.apt_name}</h3>
              </div>
            </div>
            <div className='aptPrice'>
              <div className='content_header'>
                <img src="https://i.imgur.com/lYgSkrc.jpg" alt="logo" />
                <a>아파트 거래 분석</a><a style={{ fontSize: '10px', marginLeft: '20px' }}>※최근 3년 실거래를 분석한 결과입니다.</a>
              </div>
              <div className='content_main'>
                <div className='custom-scroll-menu-container'>
                  <ul>
                    {AptData.trades.map((item) => (
                      <li
                        key={item.apt_sq}
                        className={(item.apt_sq === sqIsActive ? 'menu-active' : '')}
                        onClick={() => handleSqClick(item.apt_sq)}
                      >
                        <a>{item.apt_sq}평</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: '10px' }}>
                  {AptData.trades.map((item) => (
                    <div
                      key={item.apt_sq}
                      className={item.apt_sq == sqIsActive ? 'info-active' : 'info-hidden'}
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchTabContent;
