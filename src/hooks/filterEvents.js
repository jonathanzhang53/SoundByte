const filterEvents = (events, searchStart, searchEnd, searchLocation) => {
  const startDate = new Date(searchStart);
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(searchEnd);
  endDate.setUTCHours(0, 0, 0, 0);
  
  // Filters based on search criteria
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setUTCHours(0, 0, 0, 0);
    const matchDates = (!searchStart && !searchEnd) || 
                       (eventDate >= startDate && eventDate <= endDate) || 
                       (eventDate >= startDate && !searchEnd) || 
                       (!searchStart && eventDate <= endDate);
    const matchLocation = !searchLocation || event.venue.location.toLowerCase().startsWith(searchLocation.toLowerCase());
    return matchDates && matchLocation;
  }).map(event => ({
    ...event,
    formattedDate: new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }));
  
  return filteredEvents || null;
};

export default filterEvents;