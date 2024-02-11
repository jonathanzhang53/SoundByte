import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon missing issue
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const API_URL = 'https://api.edmtrain.com/v1/';
const API_KEY = '0c2eac8f-7ad2-47ad-8e3d-be23128d8900';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  const [events, setEvents] = useState([]);
  const [searchDates, setSearchDates] = useState('');
  const [searchEDM, setSearchEDM] = useState('');
  const [searchNonEDM, setSearchNonEDM] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}events?client=${API_KEY}`);
        const data = await response.json();

        if (data.success) {
          setEvents(data.data);
        } else {
          console.error('API request failed:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter events based on search bar: dates, EDM, non-EDM events
  const filteredEvents = events.filter(event => {
    const matchDates = !searchDates || event.date.includes(searchDates);
    const matchEDM = !searchEDM || event.isEDM === searchEDM;
    const matchNonEDM = !searchNonEDM || event.isEDM !== searchNonEDM;
      return matchDates && matchEDM && matchNonEDM;
  });

  // TODO --------- Finish Search Functionality: Create state variables `searchDates`, `searchEDM`, and `searchNonEDM` to store the search input values
    
  const position = [51.505, -0.09];

  return (
    // Search Bar
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

      <ul>
        {/* Map over each event and render a list item for each */}
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.name || 'Unnamed Event'}</strong>
            <p>Date: {event.date}</p>
            <p>Venue: {event.venue.name} - {event.venue.location}</p>
            <p>Artists: {event.artistList.map((artist) => artist.name).join(', ')}</p>
            <a href={event.link}>More Info</a>
            <hr />
          </li>
        ))}
      </ul>

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

export default App;