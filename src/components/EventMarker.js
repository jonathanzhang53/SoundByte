import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const EventMarker = ({ event, customIcon }) => {
  return (
    <Marker position={[event.venue.latitude, event.venue.longitude]} icon={customIcon}>
      <Popup>
        {event.name ? (
          <>
            <div>
              <strong>{event.name}</strong> is happening at <strong>{event.venue.name}</strong> on <strong>{event.formattedDate}</strong>.
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
                <strong>{event.artistList[0].name}</strong> is playing at <strong>{event.venue.name}</strong> on <strong>{event.formattedDate}</strong>.
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
          <div>Unknown event happening at <strong>{event.venue.name}</strong> on <strong>{event.formattedDate}</strong>.</div>
        )}
        <div>Learn more <a href={event.link} target="_blank" rel="noopener noreferrer">here</a>.</div>
      </Popup>
    </Marker>
  );
};

export default EventMarker;
