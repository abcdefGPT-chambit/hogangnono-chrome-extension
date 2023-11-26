import React, { useState, useEffect, useRef } from 'react';
import './searchTabContent.css';

function SearchTabContent() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchTabRef   = useRef();

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
  
      const data = await response.json();
      setSearchResults(data);
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
      console.error("Fetching data failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div style={{position:'absolute', left:'750px', top:'-190px'}} className={divClassName}>
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
                <path d="M9 9l6 6m0-6l-6 6" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
              </button>
            )}
            <button className='search-icon' onClick={handleSearch} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="6"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            </button>
          </div>
        </div>
        { showResults && (
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
      {!isLoading && !data && (
        <div className="centered-message">검색 결과를 통해 비교해보세요!</div>
      )}
      {data && (
        <div>
        <h2>{data.apt_name}</h2>
        <h3>리뷰</h3>
        <ul>
          {data.reviews.map((review, index) => (
            <li key={index}>
              <strong>카테고리 {review.category}:</strong> {review.review}
            </li>
          ))}
        </ul>
        <h3>거래 정보</h3>
        {data.trades.map((trade, index) => (
          <div key={index}>
            <p><strong>평수:</strong> {trade.apt_sq}</p>
            <p>{trade.avg_price}</p>
            <p>{trade.top_avg_price}</p>
            <p>{trade.bottom_avg_price}</p>
          </div>
        ))}
      </div>
      )}
    </div>
    </div>
  );
}

export default SearchTabContent;
