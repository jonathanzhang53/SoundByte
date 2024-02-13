import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import useFetchEvents from './useFetchEvents';

function useMapMarker(){
  const { events, isLoading, error } = useFetchEvents();
  let positions = [];
  let first100 = events.slice(0,10);
  first100.forEach(function(event) {
    positions.push([event.venue.latitude, event.venue.longitude]);
  });
  console.log(first100.length);
  console.log(positions);
  return positions;
}
export default useMapMarker;