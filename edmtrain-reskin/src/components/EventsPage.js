import React from 'react';

function EventsPage({ events }) {
  return (
    <ul>
      {events.map((event) => (
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
  );
}

export default EventsPage;