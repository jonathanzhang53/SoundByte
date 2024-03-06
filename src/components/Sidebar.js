import React from 'react';

function Sidebar({ events }) {
  return (
    <div style={{ width: '95%', backgroundColor: '#FFFFFF', padding: '10px', overflowY: 'scroll' }}>
      {events && events.length > 0 ? (
        events.map(event => (
          <div 
            key={`${event.name}-${event.formattedDate}-${event.venue.name}-${event.artistList.map(artist => artist.name).join('-')}`} 
            style={{ marginBottom: '10px', border: '1px solid #000', padding: '5px' }}
          >
            <h3>{event.name}</h3>
            <p>Date: {event.formattedDate}</p>
            <p>Venue: {event.venue.name} - {event.venue.location}</p>
            <p>Artists: {event.artistList.map(artist => artist.name).join(', ')}</p>         
            <a href={event.link}>More Info</a>
          </div>
        ))
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
}

export default Sidebar;
