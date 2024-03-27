import React, { useState, useEffect, useRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import CitiesContext from '../contexts/CitiesContext';
import Sidebar from './Sidebar';

import 'react-datepicker/dist/react-datepicker.css';

function Searchbar({ searchStart, setStartDate, searchEnd, setEndDate, setSearchLocation, setMapCenter }) {
  const cities = useContext(CitiesContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [matchedCities, setMatchedCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const wrapperRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    // Create or update refs for each dropdown item
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
      setShowSidebar(false); // Hide the sidebar when search location is cleared
      return;
    }

    const matches = cities.filter(city => city.name.toLowerCase().startsWith(inputValue.toLowerCase())).slice(0, 10);
    setMatchedCities(matches);
    setShowDropdown(true);
    setHighlightIndex(-1);
    setShowSidebar(true); // Show the sidebar when a search location is entered
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
      setMapCenter({ lat: selectedCity.lat, lon: selectedCity.lon });
      setShowDropdown(false);
    }
  };

  const handleSelectCity = (city) => {
    setSearchLocation(city.name); // Update searchLocation with the selected city's name
    setMapCenter({ lat: city.lat, lon: city.lon });
    setShowDropdown(false);
    setInputValue(city.name); // Optionally update inputValue to reflect the selected city
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '65%', zIndex: 1000, marginLeft: '100px', position: 'absolute' }} ref={wrapperRef}>
      {/* Start Date Picker */}
      <DatePicker
        selected={searchStart}
        onChange={date => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Start Date (YYYY-MM-DD)"
        style={{ width: '30%', padding: '5px', marginLeft: '10px' , marginBottom: '10px'}}
      />

      {/* End Date Picker */}
      <DatePicker
        selected={searchEnd}
        onChange={date => setEndDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="End Date (YYYY-MM-DD)"
        style={{ width: '30%', padding: '5px', marginLeft: '10px' }}
      />

      {/* City Search and Select Input */}
      <div style={{ position: 'relative', width: '30%' }}>
        <input
          type="text"
          placeholder="Search a city"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          style={{ width: '100%', padding: '5px', marginBottom: '0' }}
        />
        {showDropdown && (
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, position: 'absolute', width: '100%', maxHeight: '200px', overflowY: 'auto', backgroundColor: 'white', border: '1px solid #ccc', borderTop: 'none', zIndex: 1001 }}>
            {matchedCities.length > 0 ? matchedCities.map((city, index) => {
              // Assign ref to each item
              const setRef = el => itemRefs.current[index] = el;

              return (
                <li
                  key={index}
                  ref={setRef}
                  onMouseOver={() => setHighlightIndex(index)}
                  onClick={() => handleSelectCity(city)}
                  style={{ padding: '10px', cursor: 'pointer', backgroundColor: index === highlightIndex ? '#f0f0f0' : 'transparent' }}
                >
                  {city.name + ", " + city.country}
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
