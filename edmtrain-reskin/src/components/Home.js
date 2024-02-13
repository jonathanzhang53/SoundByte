import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import useFetchEvents from '../hooks/useFetchEvents';
import FilterBar from './FilterBar';
import EventMap from './EventMap';
import Sidebar from './Sidebar';

function Home() {
  const { events, isLoading, error } = useFetchEvents();

  // TODO: DELETE LATER
  const positions = [
    [51.505, -0.09],
    [51.515, -0.10],
    [51.525, -0.11],
    [51.535, -0.12],
    [51.545, -0.13],
    [51.555, -0.14],
    [51.565, -0.15],
    [51.575, -0.16],
    [51.585, -0.17],
    [51.595, -0.18],
  ];

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

      <EventMap positions={positions} />
    
      {/* FIXME: sidebar overlay map */}
      {/* <Sidebar events={events} /> */}
    </div>
  );
}

export default Home;
