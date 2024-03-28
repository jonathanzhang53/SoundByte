import { useState, useEffect } from 'react';

const useCurrentPosition = (defaultPosition) => {
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      () => {
        console.error('Could not fetch your current location.');
      }
    );
  }, []);

  return [position, setPosition];
};

export default useCurrentPosition;
