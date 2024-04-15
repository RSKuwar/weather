import React, { useState } from 'react';

const Autocomplete = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value);
  };

  return (
    <input
      type="text" 
      placeholder="Search city..."
      value={term}
      onChange={handleChange}
    />
  );
};

export default Autocomplete;
