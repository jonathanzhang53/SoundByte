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

  // Cuts off filtered markers at 500
  const first10 = filteredEvents.slice(0, 100);

  return (
    <div style={{ height: '100vh', display: 'flex', backgroundColor: '#9E6060', paddingTop: '50px' }}>
      {/* Map container */}
      <div style={{ flex: 1 }}>
        <Searchbar
          searchDates={searchDates}
          setSearchDates={setDates}
          searchLocation={searchLocation}
          setSearchLocation={setLocation}
        />
        
        {/* EventMap with adjusted width */}
        <div style={{ width: '100%', height: '100%', zIndex: 1 }}>
          <EventMap filteredEvents={first10} />
        </div>
      </div>

      {/* Sidebar with adjusted width */}
      <div style={{ width: '20%', backgroundColor: '#FFFFFF', padding: '5px', overflowY: 'auto', zIndex: 2 }}>
        <Sidebar events={first10} />
      </div>
    </div>
  );
}

export default Home;
