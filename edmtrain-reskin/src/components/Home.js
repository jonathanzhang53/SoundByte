import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Searchbar from './Searchbar';
import EventMap from './EventMap';
import Sidebar from './Sidebar';

function Home({events}) {
  const [searchDates, setDates] = useState('');
  const [searchLocation, setLocation] = useState('');

  // Filters based on search criteria
  const filteredEvents = events.filter(event => {
    const matchDates = !searchDates || event.date.includes(searchDates);
    const matchLocation = !searchLocation || event.venue.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchDates && matchLocation;
  });

  // Cuts off filtered markers at 500 (TEMPORARY)
  const first10 = filteredEvents.slice(0, 500);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#9E6060', paddingTop: '50px' }}>
      <Searchbar
        searchDates={searchDates}
        setSearchDates={setDates}
        searchLocation={searchLocation}
        setSearchLocation={setLocation}
      />
      
      <EventMap filteredEvents={first10} />
    
      {/* FIXME: sidebar overlay map */}
      {/* <Sidebar events={events} /> */}
    </div>
  );
}

export default Home;
