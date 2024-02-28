import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Searchbar({ searchStart,  setStartDate, searchEnd,  setEndDate, searchLocation, setSearchLocation }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '65%', zIndex: 1000 , marginLeft: '100px' }}>
      <DatePicker
        selected={searchStart}
        onChange={date => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Start Date (YYYY-MM-DD)"
        style={{ width: '30%', padding: '5px', marginLeft: '10px' }}
      />
      <DatePicker
        selected={searchEnd}
        onChange={date => setEndDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="End Date (YYYY-MM-DD)"
        style={{ width: '30%', padding: '5px', marginLeft: '10px' }}
      />
      <input
        type="text"
        placeholder="Search by City"
        value={searchLocation}
        onChange={e => setSearchLocation(e.target.value)}
        style={{ width: '30%', height: '7px', padding: '5px'}}
      />
    </div>
  );
}

export default Searchbar;
