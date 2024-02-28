import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import mapMarkerSvg from '../assets/map_marker.svg';
import L from 'leaflet';

function MapCenterUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lon], map.getZoom());
    }
  }, [center, map]);

  return null;
}

function EventMap({ filteredEvents, center }) {
  const [currentPosition, setCurrentPosition] = useState([29.6520, -82.3250]);  // Default to Gainesville, FL
  const customIcon = new L.Icon({
      iconUrl: mapMarkerSvg,
      iconSize: [38, 95],  // Size of the icon in pixels
      iconAnchor: [22, 94],  // Point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76],  // Point from which the popup should open relative to the iconAnchor
  });
  const bounds = [
    [90, -180],
    [-90, 180]
  ];

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([latitude, longitude]);
      },
      () => {
        console.error('Could not fetch your current location.');
      }
    );
  }, []);

  // Reset map center
  useEffect(() => {
    if (center) {
      setCurrentPosition([center.lat, center.lon]);
    }
  }, [center]);

  return (
    <MapContainer center={currentPosition} zoom={13} maxBounds={bounds} style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Generate markers for each event */}
      {filteredEvents.map((event, index) => (
        <Marker key={index} position={[event.venue.latitude, event.venue.longitude]} icon={customIcon}>
          <Popup>
          {event.name ? (
            <>
              <div><strong>{event.name}</strong> is happening at <strong>{event.venue.name}</strong> on <strong>{event.date}</strong>.</div>
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
                  <strong>{event.artistList[0].name}</strong> is playing at <strong>{event.venue.name}</strong> on <strong>{event.date}</strong>.
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
            <div>Unknown event happening at <strong>{event.venue.name}</strong> on <strong>{event.date}</strong>.</div>
          )
          }
          <div>Learn more <a href={event.link} target="_blank" rel="noopener noreferrer">here</a>.</div>
          </Popup>
        </Marker>
      ))}

      <MapCenterUpdater center={center} />
    </MapContainer>
  );
}

export default EventMap;
