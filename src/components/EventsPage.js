import React, { useState, useContext } from 'react';
import EventsContext from '../contexts/EventsContext';
import filterEvents from '../hooks/filterEvents';
import Searchbar from './Searchbar';


function EventsPage() {
  const { events } = useContext(EventsContext);
  const [searchStart, setStart] = useState('');
  const [searchEnd, setEnd] = useState('');
  const [searchLocation, setLocation] = useState('');
  const [mapCenter, setMapCenter] = useState(null);

  const {filteredEvents} = filterEvents(events, searchStart, searchEnd, searchLocation)

  console.log(mapCenter);
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
  <div
    key={`${event.name}-${event.formattedDate}-${event.venue.name}-${event.artistList.map(artist => artist.name).join('-')}`} 
    className="event-container" 
    style={{marginLeft: '10px', marginRight: '10px', color: 'white'}}
  >
    {event.name ? (
      <>
        <div>
          <strong className="event-name" style={{color: '#f000ff'}}>{event.name}</strong> is happening at <strong className="event-name">{event.venue.name}</strong> on <strong className="event-name">{event.formattedDate}</strong>.
          {event.ages && ` ${event.ages}`}
        </div>
        {event.artistList.length > 0 && (
          <div>
            Featuring:
            <ul>
              {event.artistList.slice(0, 3).map((artist, index) => (
                <li key={index}>{artist.name}</li>
              ))}
              {event.artistList.length > 3 && (
                <li>+ {event.artistList.length - 3} more {event.artistList.length - 3 === 1 ? 'artist' : 'artists'}</li>
              )}
            </ul>
          </div>
        )}
      </>
    ) : (
      event.artistList.length > 0 ? (
        <>
          <div>
            <strong className="event-name" style={{color: '#f000ff'}}>{event.artistList[0].name}</strong> is playing at <strong className="event-name">{event.venue.name}</strong> on <strong className="event-name">{event.formattedDate}</strong>.
            {event.ages && ` ${event.ages}`}
          </div>
          {event.artistList.length > 1 && (
            <div>
              Openers include:
              <ul>
                {event.artistList.slice(1, 3).map((artist, index) => (
                  <li key={index}>{artist.name}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : 
      <div>Unknown event happening at <strong className="event-name" style={{color: '#f000ff'}}>{event.venue.name}</strong> on <strong>{event.formattedDate}</strong>.</div>
    )}
    <div>Learn more <a href={event.link} target="_blank" rel="noopener noreferrer"  className="event-link">here</a>.</div>
    <hr />
  </div>
))}
      </ul>
    </div>
    </div>
  );
}

export default EventsPage;
