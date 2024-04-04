import React, { useState, useContext } from 'react';
import EventsContext from '../../contexts/EventsContext';
import filterEvents from '../../hooks/filterEvents';
import EventFilter from '../EventFilter/EventFilter';

function EventsPage() {
  const { events } = useContext(EventsContext);
  const [searchStart, setStart] = useState('');
  const [searchEnd, setEnd] = useState('');
  const [searchLocation, setLocation] = useState('');

  const { filteredEvents } = filterEvents(events, searchStart, searchEnd, searchLocation);

  const renderEventOrArtistInfo = (event) => {
    if (event.name) {
      return (
        <div>
          <strong className="event-name">{event.name}</strong> is happening at <strong className="event-name">{event.venue.name}</strong> on <strong className="event-name">{event.formattedDate}</strong>.
          {event.ages && ` ${event.ages}`}
        </div>
      );
    } else if (event.artistList.length > 0) {
      return (
        <div>
          <strong className="event-name">{event.artistList[0].name}</strong> is playing at <strong className="event-name">{event.venue.name}</strong> on <strong className="event-name">{event.formattedDate}</strong>.
          {event.ages && ` ${event.ages}`}
        </div>
      );
    }
    return <div>Unknown event happening at <strong className="event-name">{event.venue.name}</strong> on <strong>{event.formattedDate}</strong>.</div>;
  };

  const renderArtistsOrOpeners = (event) => {
    if (event.name && event.artistList.length > 0) {
      return (
        <div>
          Featuring:
          <ul>
            {event.artistList.slice(0, 3).map((artist, index) => (
              <li key={index}>{artist.name}</li>
            ))}
            {event.artistList.length > 3 && <li>+ {event.artistList.length - 3} more {event.artistList.length - 3 === 1 ? 'artist' : 'artists'}</li>}
          </ul>
        </div>
      );
    } else if (!event.name && event.artistList.length > 1) {
      return (
        <div>
          Openers include:
          <ul>
            {event.artistList.slice(1, 3).map((artist, index) => (
              <li key={index}>{artist.name}</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="events-container">
      <div className="searchbar-margin">
        <EventFilter
          searchStart={searchStart}
          setStartDate={setStart}
          searchEnd={searchEnd}
          setEndDate={setEnd}
          setSearchLocation={setLocation}
        />
      </div>
      <ul>
        {filteredEvents.map((event, index) => (
          <div
            key={{index}>`${event.name}-${event.formattedDate}-${event.venue.name}-${event.artistList.map(artist => artist.name).join('-')}`}
            className="event-container"
          >
            {renderEventOrArtistInfo(event)}
            {renderArtistsOrOpeners(event)}
            <div>Learn more <a href={event.link} target="_blank" rel="noopener noreferrer" className="event-link">here</a>.</div>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
