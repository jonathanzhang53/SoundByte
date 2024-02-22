import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import useFetchEvents from '../hooks/useFetchEvents';
import FilterBar from './FilterBar';
import EventMap from './EventMap';
import Sidebar from './Sidebar';

function Home({events}) {

  const positions = [
    [29.6520,-82.3250]
  ];

  // Fetch the first 10 events
  if(events.length >0){
    const first10 = events.slice(0, 10);

  // Extract latitude and longitude coordinates into positions array

  const filteredEvents = events.filter(event => {
    const matchLocation = event.venue.location.includes("Gainesville");
    return matchLocation;
  });
  
   first10.forEach(event => {
    positions.push([event.venue.latitude, event.venue.longitude]);
  });
    console.log(first10);
    console.log(positions[0]);
  }

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
