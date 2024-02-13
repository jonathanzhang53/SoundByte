import { useState, useEffect } from 'react';

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const API_URL = 'https://edmtrain.com/api/events';
      const API_KEY = '0c2eac8f-7ad2-47ad-8e3d-be23128d8900';
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
