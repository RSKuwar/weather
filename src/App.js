import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityTable from './component/CityTable';
import WeatherPage from './component/WeatherPage';

const App = () => {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', color: 'blueviolet' }}>Weather Forecast Table</h1>
        <Routes>
          <Route path="/" element={<CityTable />} />
          <Route path="/weather/:cityName" element={<WeatherPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;