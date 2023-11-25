import React, { useState, useEffect, useRef } from 'react';
import './searchTabContent.css';

function SearchTabContent() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
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
      if (searchQuery) {
        fetchSearchResults();
      }
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

  return (
    <div style={{position:'absolute', left:'750px', top:'-190px'}} className={divClassName}>
      <div className="search-tab-blew" ref={searchTabRef}>
        <div className="search-header" onClick={() => setShowResults(true)}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder="아파트, 지역 또는 학교명으로 검색"
            className="search-input"
          />
          <button className='search-button' onClick={handleSearch} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="6"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          </button>
          <button onClick={handleClose} className="close-button" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <svg width="19" height="19" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" fill="#D3D3D3" />
            <path d="M9 9l6 6m0-6l-6 6" stroke="white" stroke-width="2" stroke-linecap="round" />
          </svg>
          </button>
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
    </div>
  );
}

export default SearchTabContent;
