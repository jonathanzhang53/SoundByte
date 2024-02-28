class Event {
  constructor(link=null, name=null, ages=null, date, startTime=null, endTime=null, venue, artistList) {
    this.link = link; // OPTIONAL
    this.name = name; // OPTIONAL
    this.ages = ages; // OPTIONAL
    this.date = date;
    this.startTime = startTime; // OPTIONAL
    this.endTime = endTime; // OPTIONAL
    this.venue = new Venue(venue);
    this.artistList = artistList.map(artist => new Artist(artist));
  }
}

class Venue {
  constructor({ name, location, address, state, latitude, longitude }) {
    // REQUIRED
    this.name = name;
    this.location = location;
    this.address = address;
    this.state = state;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
  
class Artist {
  constructor({ name }) {
    // REQUIRED
    this.name = name;
  }
}

export { Venue, Artist };

export default Event;
