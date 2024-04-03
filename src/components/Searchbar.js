import React, { useState, useEffect, useRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import CitiesContext from '../contexts/CitiesContext';
import Sidebar from './Sidebar';

import 'react-datepicker/dist/react-datepicker.css';

function Searchbar({ searchStart, setStartDate, searchEnd, setEndDate, setSearchLocation }) {
  const cities = useContext(CitiesContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [matchedCities, setMatchedCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const wrapperRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, matchedCities.length);
  }, [matchedCities]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!inputValue) {
      setMatchedCities([]);
      setShowDropdown(false);
      setHighlightIndex(-1);
      setShowSidebar(false);
      return;
    }

    const matches = cities.filter(city => city.name.toLowerCase().startsWith(inputValue.toLowerCase())).slice(0, 10);
    setMatchedCities(matches);
    setShowDropdown(true);
    setHighlightIndex(-1);
    setShowSidebar(true);
  }, [inputValue, cities]);

  useEffect(() => {
    if (highlightIndex >= 0 && highlightIndex < matchedCities.length) {
      itemRefs.current[highlightIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [highlightIndex, matchedCities.length]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex(prevIndex => Math.min(prevIndex + 1, matchedCities.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      const selectedCity = matchedCities[highlightIndex];
      setSearchLocation(selectedCity.name);
      setShowDropdown(false);
    }
  };

  const handleSelectCity = (city) => {
    setSearchLocation(city.name);
    setShowDropdown(false);
    setInputValue(city.name);
  };

  return (
    <div className="searchbar-wrapper" ref={wrapperRef}>
      {/* Start Date Picker */}
      <DatePicker
        selected={searchStart}
        onChange={date => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Start Date (YYYY-MM-DD)"
        className={`datepicker`} 
      />

      {/* End Date Picker */}
      <DatePicker
        selected={searchEnd}
        onChange={date => setEndDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="End Date (YYYY-MM-DD)"
        className={`datepicker`}
      />

      {/* City Search and Select Input */}
      <div className="citypicker-container">
        <input
          type="text"
          placeholder="Search a city"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          className="citypicker-input"
        />
        {showDropdown && (
          <ul className='citypicker-dropdown'>
            {matchedCities.length > 0 ? matchedCities.map((city, index) => {
              const setRef = el => itemRefs.current[index] = el;
              const itemClass = `citypicker-dropdown-item ${index === highlightIndex ? 'highlighted' : ''}`;
        
              return (
                <li
                  key={index}
                  ref={setRef}
                  onMouseOver={() => setHighlightIndex(index)}
                  onClick={() => handleSelectCity(city)}
                  className={itemClass}
                >
                  {city.name + ", " + city.admin_name + ", " + city.country}
                </li>
              );
            }) : null}
          </ul>
        )}
      </div>

      {/* Check Sidebar if ShowSidebar is true */}
      {showSidebar && <Sidebar />}
    </div>
  );
}

export default Searchbar;
