import React, { useContext } from 'react';
import EventsContext from '../contexts/EventsContext';

function Sidebar() {
  const { events } = useContext(EventsContext);

  return (
    <div style={{ width: '95%', backgroundColor: '#FFFFFF', padding: '10px', overflowY: 'scroll' }}>
      {events.map(event => (
        <div key={event.id} style={{ marginBottom: '10px', border: '1px solid #000', padding: '5px' }}>
          <h3>{event.name}</h3>
          <p>Date: {event.date}</p>
          <p>Venue: {event.venue.name} - {event.venue.location}</p>
          <p>Artists: {event.artistList.map(artist => artist.name).join(', ')}</p>
          <a href={event.link}>More Info</a>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
