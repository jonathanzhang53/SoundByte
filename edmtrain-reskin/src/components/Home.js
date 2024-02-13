import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useFetchEvents from '../hooks/useFetchEvents';

import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Home() {
  const { events, isLoading, error } = useFetchEvents();

  const position = [51.505, -0.09];
  const [searchDates, setSearchDates] = useState('');
  const [searchEDM, setSearchEDM] = useState('');
  const [searchNonEDM, setSearchNonEDM] = useState('');

  // Filter events based on search bar: dates, EDM, non-EDM events
  const filteredEvents = events.filter(event => {
    const matchDates = !searchDates || event.date.includes(searchDates);
    const matchEDM = !searchEDM || event.isEDM === searchEDM;
    const matchNonEDM = !searchNonEDM || event.isEDM !== searchNonEDM;
    return matchDates && matchEDM && matchNonEDM;
  });

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#9E6060', paddingTop: '50px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '65%' }}>
        <input
          type="text"
          placeholder="Search Date (MM-DD-YYYY)"
          value={searchDates}
          onChange={e => setSearchDates(e.target.value)}
          style={{ width: '30%', padding: '5px', marginLeft: '10px' }}
        />
        <input
          type="text"
          placeholder="Search EDM Events"
          value={searchEDM}
          onChange={e => setSearchEDM(e.target.value)}
          style={{ width: '30%', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Search Non-EDM Events"
          value={searchNonEDM}
          onChange={e => setSearchNonEDM(e.target.value)}
          style={{ width: '30%', padding: '5px' }}
        />
      </div>

      {/* Leaflet Map */}
      <MapContainer center={position} zoom={13} style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Home;