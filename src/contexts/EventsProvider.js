import React, { useState, useEffect } from 'react';
import EventsContext from './EventsContext';
import { transformEventData } from '../assets/transformEventData';

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const API_URL = process.env.REACT_APP_API_URL;
      const API_KEY = process.env.REACT_APP_API_KEY;
      try {
        const response = await fetch(`${API_URL}?client=${API_KEY}`);
        const data = await response.json();
        if (data.success) {
          const transformedEvents = transformEventData(data.data);
          setEvents(transformedEvents);
        } else {
          setError('API request failed: ' + data.message);
        }
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = { events, isLoading, error };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
