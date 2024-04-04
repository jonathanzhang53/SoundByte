import { transformEvents } from './transformEvents';
import Event, { Artist, Venue } from '../models/Event';

const mockEvents = [
  {
    link: "https://edmtrain.com/miami-fl/sets-miami-yacht-experience-hernan-cattaneo-310871?utm_source=2154&utm_medium=api",
    name: "SET's Miami Yacht Experience",
    ages: "21+",
    date: "2024-03-19",
    startTime: null,
    endTime: null,
    venue: {
      id: 9035,
      name: "South Beach Lady Yacht (Hollywood)",
      location: "Hollywood, FL",
      address: "1318 N Ocean Dr, Hollywood, FL 33019, USA",
      state: "Florida",
      latitude: 26.02,
      longitude: -80.117,
    },
    artistList: [
      {
        id: 311,
        name: "Hernan Cattaneo",
        link: "https://edmtrain.com/tours/hernan-cattaneo-311?utm_source=2154&utm_medium=api",
        b2bInd: true,
      },
      {
        id: 467,
        name: "Nick Warren",
        link: "https://edmtrain.com/tours/nick-warren-467?utm_source=2154&utm_medium=api",
        b2bInd: false,
      },
    ],
  },
  {
    link: "https://edmtrain.com/orlando-fl/saxsquatch-311500?utm_source=2154&utm_medium=api",
    name: "Saxsquatch",
    ages: "18+",
    date: "2024-03-19",
    startTime: null,
    endTime: null,
    venue: {
      id: 16274,
      name: "Tuffy's Music Box",
      location: "Sanford, FL",
      address: "200 Myrtle Ave, Sanford, FL 32771, USA",
      state: "Florida",
      latitude: 28.811,
      longitude: -81.27,
    },
    artistList: [
      {
        id: 21478,
        name: "Saxsquatch",
        link: "https://edmtrain.com/tours/saxsquatch-21478?utm_source=2154&utm_medium=api",
        b2bInd: false,
      },
    ],
  }
];

describe('transformEventData', () => {
  it('correctly transforms raw API data into event objects', () => {
    const transformed = transformEvents(mockEvents);

    expect(transformed.length).toBe(2); // Expect two events

    // assertions for first event
    expect(transformed[0]).toBeInstanceOf(Event);
    expect(transformed[0].venue).toBeInstanceOf(Venue);
    expect(transformed[0].artistList[0]).toBeInstanceOf(Artist);
    expect(transformed[0].artistList.length).toBe(2);
    expect(transformed[0].name).toEqual("SET's Miami Yacht Experience");
    expect(transformed[0].venue.name).toEqual("South Beach Lady Yacht (Hollywood)");
    expect(transformed[0].artistList.map(a => a.name)).toEqual(["Hernan Cattaneo", "Nick Warren"]);

    // assertions for second events
    expect(transformed[1]).toBeInstanceOf(Event);
    expect(transformed[1].venue).toBeInstanceOf(Venue);
    expect(transformed[1].artistList[0]).toBeInstanceOf(Artist);
    expect(transformed[1].artistList.length).toBe(1);
    expect(transformed[1].name).toEqual("Saxsquatch");
    expect(transformed[1].venue.name).toEqual("Tuffy's Music Box");
    expect(transformed[1].venue.location).toEqual("Sanford, FL");
    expect(transformed[1].venue.address).toEqual("200 Myrtle Ave, Sanford, FL 32771, USA");
    expect(transformed[1].venue.state).toEqual("Florida");
    expect(transformed[1].venue.latitude).toEqual(28.811);
    expect(transformed[1].venue.longitude).toEqual(-81.27);
    expect(transformed[1].artistList.map(a => a.name)).toEqual(["Saxsquatch"]);
  });
});