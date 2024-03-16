import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function MapCenterUpdater({ center, bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (center) {
      map.flyTo([center.lat, center.lon], map.getZoom());
    }
  }, [center, bounds, map]);

  return null;
}

export default MapCenterUpdater;
