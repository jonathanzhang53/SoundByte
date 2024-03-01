import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import useFetchCities from '../hooks/useFetchCities';

import 'react-datepicker/dist/react-datepicker.css';

function Searchbar({ searchStart,  setStartDate, searchEnd,  setEndDate, searchLocation, setSearchLocation, setMapCenter }) {
  const cities = useFetchCities();
  
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
        onChange={e => {
          const [name, lat, lon] = e.target.value.split(",");
          setSearchLocation(name);
          setMapCenter({ lat: parseFloat(lat), lon: parseFloat(lon) });
        }}
        style={{ width: '30%', height: '40px', padding: '5px'}}
      >
        <option value="">Select a City</option>
        {cities.map((city, index) => (
          <option key={index} value={`${city.name},${city.lat},${city.lon}`}>{city.name + ", " + city.country}</option>
        ))}
      </select>
    </div>
  );
}

Searchbar.propTypes = {
  searchStart: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func.isRequired,
  searchEnd: PropTypes.instanceOf(Date),
  setEndDate: PropTypes.func.isRequired,
  searchLocation: PropTypes.string.isRequired,
  setSearchLocation: PropTypes.func.isRequired,
  setMapCenter: PropTypes.func.isRequired,
};

export default Searchbar;
