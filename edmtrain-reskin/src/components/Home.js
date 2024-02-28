import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Searchbar from './Searchbar';
import EventMap from './EventMap';
import Sidebar from './Sidebar';

function Home({events}) {
  //needs an initial coordinate to set the start as or else map doesn't generate
  //this is set to Gainesville's lat and long for rn
  const positions = [
    [29.6520,-82.3250]
  ];

  const [searchStart, setStart] = useState('');
  const [searchEnd, setEnd] = useState('');
  const [searchLocation, setLocation] = useState('');
  const startDate = new Date(searchStart);
  startDate.setUTCHours(0, 0, 0, 0); 
  const endDate = new Date(searchEnd);
  endDate.setUTCHours(0, 0, 0, 0); 

  // Filter events based on search bar: dates, EDM, non-EDM events
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

  //Cuts off filtered markers at 500
  const first10 = filteredEvents.slice(0, 100);

  // Extract latitude and longitude coordinates into positions array
  first10.forEach(event => {
    positions.push([event.venue.latitude, event.venue.longitude]);
  });

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#9E6060', paddingTop: '50px' }}>
      <Searchbar
        searchStart={searchStart}
        setStartDate={setStart}
        searchEnd={searchEnd}
        setEndDate={setEnd}
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
