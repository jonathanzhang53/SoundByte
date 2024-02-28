import React, { useState } from 'react';
import Searchbar from './Searchbar';

function EventsPage({ events }) {
  const [searchDates, setDates] = useState('');
  const [searchLocation, setLocation] = useState('');

  // Filter events based on search bar: dates, EDM, non-EDM events
  const filteredEvents = events.filter(event => {
    const matchDates = !searchDates || event.date.includes(searchDates);
    const matchLocation = !searchLocation || event.venue.location.toLowerCase().startsWith(searchLocation.toLowerCase());
    return matchDates && matchLocation;
  });

  return (
    <>
      <Searchbar
        searchDates={searchDates}
        setSearchDates={setDates}
        searchLocation={searchLocation}
        setSearchLocation={setLocation}
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