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
  const [showSidebar, setShowSidebar] = useState(false);

  const { filteredEvents, bounds } = filterEvents(events, searchStart, searchEnd, searchLocation);

  const handleCitySelection = (location) => {
    setLocation(location);
    setShowSidebar(true);
  }

  return (
    <div className="home-container"> {/* Use class names instead of inline styles */}
      <div className="map-container">
        <Searchbar
          searchStart={searchStart}
          setStartDate={setStart}
          searchEnd={searchEnd}
          setEndDate={setEnd}
          setSearchLocation={handleCitySelection}
        />
        
        <div className="event-map">
          <EventMap filteredEvents={filteredEvents} center={null} bounds={bounds}/>
        </div>
      </div>
  
      {showSidebar && (
        <div className="sidebar">
          <Sidebar events={filteredEvents} />
        </div>
      )}
    </div>
  );
}

export default Home;
