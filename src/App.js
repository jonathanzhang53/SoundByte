import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EventsProvider } from './contexts/EventsProvider';
import { CitiesProvider } from './contexts/CitiesProvider';
import EventsPage from './components/EventsPage';
import Home from './components/Home';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Nav bar */}
        <nav style={{ marginBottom: '20px' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ display: 'inline', marginRight: '10px' }}>
              <Link to="/" style={linkStyle}>Home</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '10px' }}>
              <Link to="/events" style={linkStyle}>Events</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '10px' }}>
              <Link to="/about" style={linkStyle}>About Us</Link>
            </li>
          </ul>
        </nav>

        <CitiesProvider>
          <EventsProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </EventsProvider>
        </CitiesProvider>
      </div>
    </Router>
  );
}
const linkStyle = {
  textDecoration: 'none',
  padding: '10px 50px',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  backgroundColor: '#03ddff',
  boxShadow: '0 0 1px #03ddff, 0 0 1px #03ddff, 0 0 1px #03ddff, 0 0 5px #03ddff, 0 0 5px #03ddff, 0 0 40px #03ddff, 0 0 5px #03ddff, 0 0 15px #03ddff',
  animation: 'flicker 1.5s infinite alternate',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
}



export default App;
