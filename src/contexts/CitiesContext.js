import React, { createContext, useState, useEffect } from 'react';
import * as d3 from 'd3';

const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // city data is currently too large to cache in localStorage
      // const cachedData = localStorage.getItem('citiesData');
      // if (cachedData) {
      //   // console.log("cached city data: ", JSON.parse(cachedData));
      //   setCities(JSON.parse(cachedData));
      //   return;
      // }

      try {
        const data = await d3.csv('worldCities.csv');
        // console.log("data from csv: ", data);
        
        const extractedCities = data.map(city => ({
          name: city.city,
          admin_name: city.admin_name,
          ascii: city.city_ascii,
          country: city.country,
          lat: +city.lat,
          lng: +city.lng,
          iso2: city.iso2,
          iso3: city.iso3,
        }));

        setCities(extractedCities);
        // console.log("city data: ", extractedCities);

        // localStorage.setItem('citiesData', JSON.stringify(extractedCities));
      } catch (error) {
        console.error("Could not fetch cities data from the CSV:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <CitiesContext.Provider value={cities}>
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesContext;
