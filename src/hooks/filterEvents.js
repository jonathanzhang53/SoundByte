
const filterEvents = (events, searchStart, searchEnd, searchLocation) => {
  const startDate = new Date(searchStart);
  startDate.setUTCHours(5, 0, 0, 1);
  const endDate = new Date(searchEnd);
  endDate.setUTCHours(24, 59, 59, 999);

  // Filter events based on search criteria
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const matchDates = (!searchStart && !searchEnd) || 
                       (eventDate > startDate && eventDate <= endDate) || 
                       (eventDate > startDate && !searchEnd) || 
                       (!searchStart && eventDate <= endDate);
    if(matchDates){
      console.log(eventDate);
    }
    const matchLocation = !searchLocation || event.venue.location.toLowerCase().startsWith(searchLocation.toLowerCase());
    return matchDates && matchLocation;
  }).map(event => ({
    ...event,
    formattedDate: new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }));

  // Calculate bounds based on filtered events
  let bounds = filteredEvents.reduce((acc, event) => {
    const eventLatitude = parseFloat(event.venue.latitude);
    const eventLongitude = parseFloat(event.venue.longitude);

    acc[0][0] = Math.min(acc[0][0], eventLatitude);  // Update south-west lat
    acc[0][1] = Math.min(acc[0][1], eventLongitude);  // Update south-west lng
    acc[1][0] = Math.max(acc[1][0], eventLatitude);  // Update north-east lat
    acc[1][1] = Math.max(acc[1][1], eventLongitude);  // Update north-east lng

    return acc;
  }, [[Infinity, Infinity], [-Infinity, -Infinity]]);

  // Check if bounds are valid (in case there were no filtered events or all events had invalid lat/lon)
  if (bounds[0][0] === Infinity) {
    bounds = null;  // Indicates no valid bounds could be calculated
  }

  console.log(bounds);

  return {filteredEvents, bounds};
};

export default filterEvents;
