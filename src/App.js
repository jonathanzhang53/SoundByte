import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventsProvider } from './contexts/EventsContext';
import { CitiesProvider } from './contexts/CitiesContext';
import Home from './components/Home/Home';
import EventsPage from './components/EventsPage/EventsPage';
import AboutUs from './components/AboutUs/AboutUs';
import Navbar from './components/Navbar/Navbar';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />

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
