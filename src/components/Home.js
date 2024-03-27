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
  const [showSidebar, setShowSidebar] = useState(false);

  const { filteredEvents, bounds } = filterEvents(events, searchStart, searchEnd, searchLocation);
  const first10 = filteredEvents;

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
          searchLocation={searchLocation}
          setSearchLocation={handleCitySelection}
          setMapCenter={setMapCenter}
        />
        
        <div className="event-map">
          <EventMap filteredEvents={first10} center={mapCenter} bounds={bounds}/>
        </div>
      </div>
  
      {showSidebar && (
        <div className="sidebar">
          <Sidebar events={first10} />
        </div>
      )}
    </div>
  );
}

export default Home;
