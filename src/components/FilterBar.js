// TODO: THIS MAY BE OLD CODE. R WE USING?

import React from 'react';

function FilterBar({ filterDates, setFilterDates, filterEDM, setFilterEDM, filterNonEDM, setFilterNonEDM }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '65%' }}>
      <input
        type="text"
        placeholder="Filter Date (MM-DD-YYYY)"
        value={filterDates}
        onChange={e => setFilterDates(e.target.value)}
        style={{ width: '30%', padding: '5px', marginLeft: '10px' }}
      />
      <input
        type="text"
        placeholder="Filter EDM Events"
        value={filterEDM}
        onChange={e => setFilterEDM(e.target.value)}
        style={{ width: '30%', padding: '5px' }}
      />
      <input
        type="text"
        placeholder="Filter Non-EDM Events"
        value={filterNonEDM}
        onChange={e => setFilterNonEDM(e.target.value)}
        style={{ width: '30%', padding: '5px' }}
      />
    </div>
  );
}

export default FilterBar;
