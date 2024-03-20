import React from 'react';
import './sidebar.css'; // Import the sidebar.css file

function Sidebar({ events }) {
  return (
    <div className="sidebar-container">
      {events && events.length > 0 ? (
        events.map(event => (
          <div 
            key={`${event.name}-${event.formattedDate}-${event.venue.name}-${event.artistList.map(artist => artist.name).join('-')}`} 
            className="event-container" // Apply the event container class
          >
            <h3 className="event-name">{event.name}</h3> {/* Apply the event name class */}
            <p>Date: {event.formattedDate}</p>
            <p>Venue: {event.venue.name} - {event.venue.location}</p>
            <p>Artists: {event.artistList.map(artist => artist.name).join(', ')}</p>         
            <a href={event.link} className="event-link">More Info</a> {/* Apply the link class */}
          </div>
        ))
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
}

export default Sidebar;
