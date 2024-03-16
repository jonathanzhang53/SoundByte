import L from 'leaflet';
import mapMarkerSvg from './map_marker.svg';

export const createCustomIcon = () => {
  return new L.Icon({
    iconUrl: mapMarkerSvg,
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
};