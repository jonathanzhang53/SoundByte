import React, { useState, useContext } from 'react';
import EventsContext from '../contexts/EventsContext';
import filterEvents from '../hooks/filterEvents';
import Searchbar from './Searchbar';
import EventMap from './EventMap';
import Sidebar from './Sidebar';

import 'leaflet/dist/leaflet.css';

function Home() {
  const { events } = useContext(EventsContext);
  const [searchStart, setStart] = useState('');
  const [searchEnd, setEnd] = useState('');
  const [searchLocation, setLocation] = useState('');
  const [mapCenter, setMapCenter] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false); // New state for controlling sidebar visibility

  const { filteredEvents, bounds } = filterEvents(events, searchStart, searchEnd, searchLocation)
  // Cuts off filtered markers at 500
  const first10 = filteredEvents.slice(0, 100);

  const handleCitySelection = (location) => {
    setLocation(location);
    setShowSidebar(true); // Show the sidebar when city is selected
  }

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', backgroundColor: '#9E6060', paddingTop: '20px' }}>
      {/* Map container */}
      <div style={{ flex: 1 }}>
        <Searchbar
          searchStart={searchStart}
          setStartDate={setStart}
          searchEnd={searchEnd}
          setEndDate={setEnd}
          searchLocation={searchLocation}
          setSearchLocation={handleCitySelection} // Pass handleCitySelection to Searchbar
          setMapCenter={setMapCenter}
        />
        
        {/* EventMap with adjusted width */}
        <div style={{ width: '100%', height: '100%', zIndex: 1 }}>
          <EventMap filteredEvents={first10} center={mapCenter} bounds={bounds}/>
        </div>
      </div>
  
      {/* Sidebar with adjusted width */}
      {showSidebar && (
<div style={{ width: '20%', height: '91%', backgroundColor: '#FFFFFF', padding: '15px', overflowY: 'auto', zIndex: 2, borderRadius: '15px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }}>
  <Sidebar events={first10} />
</div>
      )}
    </div>
  );
  
}

export default Home;
