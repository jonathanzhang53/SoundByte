import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventsPage from './components/EventsPage';
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import useFetchEvents from './hooks/useFetchEvents';

function App() {
  const { events, isLoading, error } = useFetchEvents();
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home events={events}/>} />
          <Route path="/events" element={<EventsPage events={events} />} />
          <Route path="/about" element={<AboutUs/>} />
        </Routes>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
