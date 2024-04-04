import Event, { Artist, Venue } from '../models/Event';

export const transformEvents = (rawData) => {
  return rawData
    .filter(eventData => eventData.venue.latitude != null && eventData.venue.longitude != null)
    .map(eventData => {
      const venueData = {
        name: eventData.venue.name,
        location: eventData.venue.location,
        address: eventData.venue.address,
        state: eventData.venue.state,
        latitude: eventData.venue.latitude,
        longitude: eventData.venue.longitude,
      };

      const artistListData = eventData.artistList.map(artistData => new Artist({ name: artistData.name }));

      return new Event(
        eventData.link,
        eventData.name,
        eventData.ages,
        new Date(eventData.date),
        eventData.startTime,
        eventData.endTime,
        new Venue(venueData),
        artistListData,
      );
    });
};
