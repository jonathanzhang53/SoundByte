import React, { useState } from 'react';
import Searchbar from './Searchbar';

function EventsPage({ events }) {
  const [searchStart, setStart] = useState('');
  const [searchEnd, setEnd] = useState('');
  const [searchLocation, setLocation] = useState('');
  const [setMapCenter] = useState(null);

  const startDate = new Date(searchStart);
  startDate.setUTCHours(0, 0, 0, 0); 
  const endDate = new Date(searchEnd);
  endDate.setUTCHours(0, 0, 0, 0); 

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setUTCHours(0, 0, 0, 0); 
    const matchDates = (!searchStart && !searchEnd) || 
                       (eventDate >= startDate && eventDate <= endDate) || 
                       (eventDate >= startDate && !searchEnd) || 
                       (!searchStart && eventDate <= endDate);
    const matchLocation = !searchLocation || event.venue.location.toLowerCase().startsWith(searchLocation.toLowerCase());
    return matchDates && matchLocation;
  });

  return (
    <>
      <Searchbar
        searchStart={searchStart}
        setStartDate={setStart}
        searchEnd={searchEnd}
        setEndDate={setEnd}
        searchLocation={searchLocation}
        setSearchLocation={setLocation}
        setMapCenter={setMapCenter}
      />
      
      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id}>
            <strong>{event.name || 'Unnamed Event'}</strong>
            <p>Date: {event.date}</p>
            <p>Venue: {event.venue.name} - {event.venue.location}</p>
            <p>Artists: {event.artistList.map((artist) => artist.name).join(', ')}</p>
            <a href={event.link}>More Info</a>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;