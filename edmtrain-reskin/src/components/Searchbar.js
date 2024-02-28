import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Searchbar({ searchDates, setSearchDates, searchLocation, setSearchLocation }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '65%', zIndex: 1000 }}>
      <DatePicker
        selected={searchDates}
        onChange={date => setSearchDates(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Search Date (YYYY-MM-DD)"
        style={{ width: '30%', padding: '5px', marginLeft: '10px' }}
      />
      <input
        type="text"
        placeholder="Search by City"
        value={searchLocation}
        onChange={e => setSearchLocation(e.target.value)}
        style={{ width: '30%', padding: '5px' }}
      />
    </div>
  );
}

export default Searchbar;
