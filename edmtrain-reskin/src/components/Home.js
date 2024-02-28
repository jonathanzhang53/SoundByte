import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Searchbar from './Searchbar';
import EventMap from './EventMap';
import Sidebar from './Sidebar';

function Home({events}) {
  const [searchStart, setStart] = useState('');
  const [searchEnd, setEnd] = useState('');
  const [searchLocation, setLocation] = useState('');
  const [mapCenter, setMapCenter] = useState(null);

  const startDate = new Date(searchStart);
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(searchEnd);
  endDate.setUTCHours(0, 0, 0, 0);

  // Filters based on search criteria
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setUTCHours(0, 0, 0, 0);
    const matchDates = (!searchStart && !searchEnd) || 
                       (eventDate >= startDate && eventDate <= endDate) || 
                       (eventDate >= startDate && !searchEnd) || 
                       (!searchStart && eventDate <= endDate);
    const matchLocation = !searchLocation || event.venue.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchDates && matchLocation;
  });

  // Cuts off filtered markers at 500 (TEMPORARY)
  const first10 = filteredEvents.slice(0, 500);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#9E6060', paddingTop: '50px' }}>
      <Searchbar
        searchStart={searchStart}
        setStartDate={setStart}
        searchEnd={searchEnd}
        setEndDate={setEnd}
        searchLocation={searchLocation}
        setSearchLocation={setLocation}
        setMapCenter={setMapCenter}
      />

      <EventMap filteredEvents={first10} center={mapCenter} />

      {/* FIXME: sidebar overlay map */}
      {/* <Sidebar events={events} /> */}
    </div>
  );
}

export default Home;
