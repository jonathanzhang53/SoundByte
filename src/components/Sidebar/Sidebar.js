import React from 'react';
import './Sidebar.css';

function Sidebar({ events }) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="map-sidebar-container">
      {events && events.length > 0 ? (
        events.map(event => (
          <div 
            key={`${event.name}-${event.formattedDate}-${event.venue.name}-${event.artistList.map(artist => artist.name).join('-')}`} 
            className="event-container"
          >
            <h3 className="event-name">{event.name}</h3>
            <p>Date: {event.formattedDate}</p>
            <p>Venue: {event.venue.name} - {event.venue.location}</p>
            <p>Artists: {event.artistList.map(artist => artist.name).join(', ')}</p>         
            <a href={event.link} className="event-link">More Info</a>
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default Sidebar;
