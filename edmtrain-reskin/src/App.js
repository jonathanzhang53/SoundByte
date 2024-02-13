// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventsPage from './components/EventsPage';
import Home from './components/Home'
import useFetchEvents from './hooks/useFetchEvents';

function App() {
  const { events, isLoading, error } = useFetchEvents();
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage events={events} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
