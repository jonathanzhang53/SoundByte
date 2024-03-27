import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function MapCenterUpdater({ center, bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.flyToBounds(bounds, { padding: [50, 50] }); // Use flyToBounds instead of fitBounds
    } else if (center) {
      map.flyTo([center.lat, center.lon], map.getZoom());
    }
  }, [center, bounds, map]);

  return null;
}

export default MapCenterUpdater;
