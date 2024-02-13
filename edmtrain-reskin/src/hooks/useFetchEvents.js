import { useState, useEffect } from 'react';

const useFetchEvents = () => {
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
          setEvents(data.data);
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

  return { events, isLoading, error };
};

export default useFetchEvents;
