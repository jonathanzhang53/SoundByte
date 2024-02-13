import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import useFetchEvents from '../hooks/useFetchEvents';
import FilterBar from './FilterBar';
import EventMap from './EventMap';

function Home() {
  const { events, isLoading, error } = useFetchEvents();

  const position = [51.505, -0.09];
  const [filterDates, setFilterDates] = useState('');
  const [filterEDM, setFilterEDM] = useState('');
  const [filterNonEDM, setFilterNonEDM] = useState('');

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#9E6060', paddingTop: '50px' }}>
      <FilterBar
        filterDates={filterDates}
        setFilterDates={setFilterDates}
        filterEDM={filterEDM}
        setFilterEDM={setFilterEDM}
        filterNonEDM={filterNonEDM}
        setFilterNonEDM={setFilterNonEDM}
      />

      <EventMap position={position} />
    </div>
  );
}

export default Home;
