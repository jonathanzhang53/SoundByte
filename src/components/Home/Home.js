import React, { useState, useContext } from 'react';
import EventsContext from '../../contexts/EventsContext';
import filterEvents from '../../hooks/filterEvents';
import Searchbar from '../Searchbar/Searchbar';
import EventMap from '../EventMap/EventMap';
import Sidebar from '../Sidebar/Sidebar';

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
    <div className="home-container">
      <div className="main-map-container main-border">
        <Searchbar
          searchStart={searchStart}
          setStartDate={setStart}
          searchEnd={searchEnd}
          setEndDate={setEnd}
          setSearchLocation={handleCitySelection}
        />
        
        <EventMap filteredEvents={filteredEvents} center={null} bounds={bounds}/>
      </div>
  
      {showSidebar && (
        <div className="sidebar main-border">
          <Sidebar events={filteredEvents} />
        </div>
      )}
    </div>
  );
}

export default Home;
