import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mapMarkerSvg from '../assets/map_marker.svg';

import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

function EventMap({ positions }) {
    const customIcon = new L.Icon({
        iconUrl: mapMarkerSvg, // The URL to the image to use as the icon
        iconSize: [38, 95], // Size of the icon in pixels
        iconAnchor: [22, 94], // Point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76], // Point from which the popup should open relative to the iconAnchor
    });

    return (
      <MapContainer center={positions[0]} zoom={13} style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {positions.map((position, index) => (
          <Marker key={index} position={position} icon={customIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }

export default EventMap;
