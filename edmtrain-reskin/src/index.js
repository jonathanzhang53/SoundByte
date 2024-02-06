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

  const position = [51.505, -0.09];

  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
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
      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
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