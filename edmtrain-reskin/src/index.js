import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

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
    </div>
  );
}

export default App;
