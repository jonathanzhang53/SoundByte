import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventsProvider } from './contexts/EventsContext';
import { CitiesProvider } from './contexts/CitiesContext';
import Home from './components/Home';
import EventsPage from './components/EventsPage';
import AboutUs from './components/AboutUs';
import NavBar from './components/NavBar';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
