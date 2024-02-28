import { useState, useEffect } from 'react';

const useFetchCities = () => {
  const [cities, setCities] = useState([]); // Initialize state to hold cities

  useEffect(() => {
    const fetchData = async () => {
      // Overpass API query
      const query = `
        [out:json];
        (
          node["place"="city"]["population"~"^[1-9][0-9]{4,}$"]
          (-90, -180, 90, 0); // Bounding box: Adjust as needed
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

        // Extract relevant city data from response
        const extractedCities = data.elements.map(element => ({
          id: element.id,
          name: element.tags.name,
          lat: element.lat,
          lon: element.lon,
        }));
        setCities(extractedCities);
      } catch (error) {
        console.error("Could not fetch Overpass data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(cities);

  return cities;
};

export default useFetchCities;