import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mapMarkerSvg from '../assets/map_marker.svg';

import L from 'leaflet';
import { Artist } from '../models/Event';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

function EventMap({ filteredEvents }) {
    const customIcon = new L.Icon({
        iconUrl: mapMarkerSvg, // The URL to the image to use as the icon
        iconSize: [38, 95], // Size of the icon in pixels
        iconAnchor: [22, 94], // Point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76], // Point from which the popup should open relative to the iconAnchor
    });
    const bounds = [
      [90, -180],  // Northeast coordinates
      [-90, 180]   // Southwest coordinates
    ];
    return (
      <MapContainer center={[29.6520,-82.3250]} zoom={13} maxBounds={bounds} style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredEvents.map((event, index) => (
          <Marker key={index} position={[event.venue.latitude, event.venue.longitude]} icon={customIcon}>
            <Popup>
            {event.name ? 
              (<><strong>{event.name}</strong> is happening at <strong>{event.venue.name}</strong>. </>)
              : 
              (event.artistList.length > 0 ?
                (<><strong>{event.artistList[0].name}</strong> is playing at <strong>{event.venue.name}</strong>. </>)
                : 
                `Unknown rave is happening at ${event.venue.name} `
              )
            }
            Learn more <a href={event.link} target="_blank" rel="noopener noreferrer">here</a>.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }

export default EventMap;
