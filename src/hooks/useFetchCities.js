import { useState, useEffect } from 'react';

const useFetchCities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Overpass API query
      const query = `
        [out:json];
        (
          node["place"="city"]["population"](if:t["population"] > 100000)
          (-90.0, -180.0, 90.0, -30.0); // Bounding box: Adjust as needed
        );
        out;
      `;
      const encodedQuery = encodeURIComponent(query);
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;

      try {
        const response = await fetch(overpassUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const extractedCities = data.elements.map(element => ({
          id: element.id,
          name: element.tags.name,
          lat: element.lat,
          lon: element.lon,
          country: "UnknownCountry"
        }));
        setCities(extractedCities);
      } catch (error) {
        console.error("Could not fetch cities data from Overpass:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(cities);

  return cities;
};

export default useFetchCities;
