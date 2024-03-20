import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventsProvider } from './contexts/EventsProvider';
import { CitiesProvider } from './contexts/CitiesProvider';
import EventsPage from './components/EventsPage';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <NavBar />

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

export default App;
