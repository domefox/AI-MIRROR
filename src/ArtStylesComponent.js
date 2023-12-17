import React, { useState } from 'react';

function ArtStylesComponent({ setPrompt }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    setPrompt.current = inputValue;
    setInputValue('');
  };

  return (
    <div style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 2 }}>
      <form onSubmit={handleInputSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your prompt here"
          style={{ width: '100%', padding: '10px' }}
        />
      </form>
    </div>
  );
}

export default ArtStylesComponent;