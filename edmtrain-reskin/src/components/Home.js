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

  const [searchDates, setDates] = useState('');
  const [searchLocation, setLocation] = useState('');

  //filters based on search criteria
  const filteredEvents = events.filter(event => {
    const matchDates = !searchDates || event.date.includes(searchDates);
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
