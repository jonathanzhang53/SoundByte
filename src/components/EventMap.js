import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { createCustomIcon } from '../assets/icons';
import MapCenterUpdater from './MapCenterUpdater';
import EventMarker from './EventMarker';
import useCurrentPosition from '../hooks/useCurrentPosition';

function EventMap({ filteredEvents, center, bounds }) {
  const [currentPosition, setCurrentPosition] = useCurrentPosition([29.6520, -82.3250]);  // Default to Gainesville, FL
  const customIcon = createCustomIcon();

  useEffect(() => {
    if (center) {
      setCurrentPosition([center.lat, center.lon]);
    }
  }, [center, setCurrentPosition]);

  return (
    <MapContainer center={currentPosition} zoom={13} maxBounds={[[90, -180], [-90, 180]]} style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredEvents.map((event, index) => (
        <EventMarker key={index} event={event} customIcon={customIcon} />
      ))}
      <MapCenterUpdater center={center} bounds={bounds} />
    </MapContainer>
  );
}

export default EventMap;
