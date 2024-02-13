import React, { useState } from 'react';


function EventsPage({ events }) {
  const [searchDates, setDates] = useState('');
  const [searchLocation, setLocation] = useState('');

  // Filter events based on search bar: dates, EDM, non-EDM events
  const filteredEvents = events.filter(event => {
    const matchDates = !searchDates || event.date.includes(searchDates);
    const matchLocation = !searchLocation || event.venue.location.includes(searchLocation);
    return matchDates && matchLocation;
  });

  return (
   <>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '65%' }}>
   <input
      type="text"
      placeholder="Search Date (MM-DD-YYYY)"
      value={searchDates}
      onChange={e => setDates(e.target.value)}
      style={{ width: '30%', padding: '5px', marginLeft: '10px' }} />
    <input
        type="text"
        placeholder="Search by City"
        value={searchLocation}
        onChange={e => setLocation(e.target.value)}
        style={{ width: '30%', padding: '5px' }} />
  </div>
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
      </ul></>
  );
}

export default EventsPage;