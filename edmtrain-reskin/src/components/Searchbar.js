import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFetchCities from '../hooks/useFetchCities';

function Searchbar({ searchDates, setSearchDates, searchLocation, setSearchLocation }) {
  const cities = useFetchCities();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '65%', zIndex: 1000 }}>
      <DatePicker
        selected={searchDates}
        onChange={date => setSearchDates(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Search Date (YYYY-MM-DD)"
        style={{ width: '30%', padding: '5px', marginLeft: '10px' }}
      />
      <select
        value={searchLocation}
        onChange={e => setSearchLocation(e.target.value)}
        style={{ width: '30%', padding: '5px' }}
      >
        <option value="">Select a City</option>
        {cities.map((city, index) => (
          <option key={index} value={city.name}>{city.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Searchbar;
