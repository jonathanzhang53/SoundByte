import React, { useState, useContext } from 'react';
import EventsContext from '../contexts/EventsContext';
import filterEvents from '../hooks/filterEvents';
import Searchbar from './Searchbar';

function EventsPage() {
  const { events } = useContext(EventsContext);
  const [searchStart, setStart] = useState('');
  const [searchEnd, setEnd] = useState('');
  const [searchLocation, setLocation] = useState('');
  const [setMapCenter] = useState(null);

  const {filteredEvents} = filterEvents(events, searchStart, searchEnd, searchLocation)

  return (
    <div className="home-container">
      <div className="map-container">
      <div style={{marginLeft: '250px', marginBottom: '40px'}}>
      <Searchbar
        searchStart={searchStart}
        setStartDate={setStart}
        searchEnd={searchEnd}
        setEndDate={setEnd}
        searchLocation={searchLocation}
        setSearchLocation={setLocation}
        setMapCenter={setMapCenter}
      />
      </div>
      
      <ul>
        {filteredEvents.map((event) => (
          <li 
          key={`${event.name}-${event.formattedDate}-${event.venue.name}-${event.artistList.map(artist => artist.name).join('-')}`} 
          className="event-container"
          >
            <strong>{event.name || 'Unnamed Event'}</strong>
            <p>Date: {event.formattedDate}</p>
            <p>Venue: {event.venue.name} - {event.venue.location}</p>
            <p>Artists: {event.artistList.map((artist) => artist.name).join(', ')}</p>
            <a href={event.link}>More Info</a>
            <hr />
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default EventsPage;
