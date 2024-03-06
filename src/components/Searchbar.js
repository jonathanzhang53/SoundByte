import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import useFetchCities from '../hooks/useFetchCities';
import Sidebar from './Sidebar'; // Import Sidebar component

import 'react-datepicker/dist/react-datepicker.css';

function Searchbar({ searchStart, setStartDate, searchEnd, setEndDate, searchLocation, setSearchLocation, setMapCenter }) {
  const cities = useFetchCities();
  const [showSidebar, setShowSidebar] = useState(false); // State to manage sidebar visibility

  // Function to handle city selection
  const handleCitySelection = (e) => {
    const [name, lat, lon] = e.target.value.split(",");
    setSearchLocation(name);
    setMapCenter({ lat: parseFloat(lat), lon: parseFloat(lon) });
    setShowSidebar(true); // Show the sidebar when city is selected
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '65%', zIndex: 1000 , marginLeft: '100px' }}>
      {/* Start Date Picker */}
      <DatePicker
        selected={searchStart}
        onChange={date => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Start Date (YYYY-MM-DD)"
        style={{ width: '30%', padding: '5px', marginLeft: '10px' }}
      />

      {/* End Date Picker */}
      <DatePicker
        selected={searchEnd}
        onChange={date => setEndDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="End Date (YYYY-MM-DD)"
        style={{ width: '30%', padding: '5px', marginLeft: '10px' }}
      />

      {/* City Picker */}
      <select
        value={searchLocation}
        onChange={handleCitySelection}
        style={{ width: '30%', height: '40px', padding: '5px'}}
      >
        <option value="">Select a City</option>
        {cities.map((city, index) => (
          <option key={index} value={`${city.name},${city.lat},${city.lon}`}>{city.name + ", " + city.country}</option>
        ))}
      </select>

      {/* Render Sidebar if showSidebar is true */}
      {showSidebar && <Sidebar />}
    </div>
  );
}

export default Searchbar;
