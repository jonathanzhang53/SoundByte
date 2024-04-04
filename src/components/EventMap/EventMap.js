import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { createCustomIcon } from '../../utils/icons';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MapCenterUpdater from '../MapCenterUpdater/MapCenterUpdater';
import useCurrentPosition from '../../hooks/useCurrentPosition';

function ClusteredMarkers({ filteredEvents, customIcon }) {
  const map = useMap();

  useEffect(() => {
    const markers = L.markerClusterGroup();

    filteredEvents.forEach(event => {
      const popupContent = createPopupContent(event);
      const marker = L.marker([event.venue.latitude, event.venue.longitude], { icon: customIcon })
        .bindPopup(popupContent);
      markers.addLayer(marker);
    });

    map.addLayer(markers);

    return () => {
      map.removeLayer(markers);
    };
  }, [filteredEvents, customIcon, map]);

  return null;
}

function createPopupContent(event) {
  let content = '';
  if (event.name) {
    content += `<div><strong>${event.name}</strong> is happening at <strong>${event.venue.name}</strong> on <strong>${event.formattedDate}</strong>.${event.ages ? ` ${event.ages}` : ''}</div>`;
    if (event.artistList.length > 0) {
      content += '<div>Featuring:<ul>';
      event.artistList.slice(0, 3).forEach(artist => {
        content += `<li>${artist.name}</li>`;
      });
      if (event.artistList.length > 3) {
        content += `<li>+ ${event.artistList.length - 3} more ${event.artistList.length - 3 === 1 ? 'artist' : 'artists'}</li>`;
      }
      content += '</ul></div>';
    }
  } else if (event.artistList.length > 0) {
    content += `<div><strong>${event.artistList[0].name}</strong> is playing at <strong>${event.venue.name}</strong> on <strong>${event.formattedDate}</strong>.${event.ages ? ` ${event.ages}` : ''}</div>`;
    if (event.artistList.length > 1) {
      content += 'Openers include:<ul>';
      event.artistList.slice(1, 3).forEach(artist => {
        content += `<li>${artist.name}</li>`;
      });
      content += '</ul></div>';
    }
  } else {
    content = `<div>Unknown event happening at <strong>${event.venue.name}</strong> on <strong>${event.formattedDate}</strong>.</div>`;
  }
  content += `<div>Learn more <a href="${event.link}" target="_blank" rel="noopener noreferrer">here</a>.</div>`;

  return content;
}

function EventMap({ filteredEvents, center, bounds }) {
  const [currentPosition, setCurrentPosition] = useCurrentPosition([29.6520, -82.3250]);  // Default to Gainesville, FL
  const customIcon = createCustomIcon();

  useEffect(() => {
    if (center) {
      setCurrentPosition([center.lat, center.lon]);
    }
  }, [center, setCurrentPosition]);

  return (
    <MapContainer center={currentPosition} minZoom={3} zoom={13} maxBounds={[[90, -180], [-90, 180]]} className="event-map-layout">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClusteredMarkers filteredEvents={filteredEvents} customIcon={customIcon} />
      <MapCenterUpdater center={center} bounds={bounds} />
    </MapContainer>
  );
}

export default EventMap;
