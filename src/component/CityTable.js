import React, { useState, useEffect } from 'react';
import Autocomplete from './Autocomplete';
import { Link } from 'react-router-dom';
import './CityTable.css'; // Import CSS file for styling

const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&refine=cou_name_en%3A%22India%22');
      const data = await response.json();
      setCities(data.results);
      setFilteredCities(data.results); // Initialize filteredCities with all cities
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  return (
    <div className="city-table-container">
      <Autocomplete onSearch={handleSearch} />
      <table className="city-table">
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map(city => (
            <tr key={city.geoname_id}>
              <td><Link to={`/weather/${city.name}`}>{city.name}</Link></td>
              <td>{city.country_code}</td>
              <td>{city.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;