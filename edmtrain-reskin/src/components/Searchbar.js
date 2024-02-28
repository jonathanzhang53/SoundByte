import React from 'react';

function Searchbar({ searchDates, setSearchDates, searchLocation, setSearchLocation }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '65%' }}>
      <input
        type="text"
        placeholder="Search Date (MM-DD-YYYY)"
        value={searchDates}
        onChange={e => setSearchDates(e.target.value)}
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
