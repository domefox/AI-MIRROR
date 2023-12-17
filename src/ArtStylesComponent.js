import React, { useState } from 'react';

function ArtStylesComponent({ setPrompt }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    setPrompt.current = inputValue;
    // setInputValue('');
  };

  return (
    <div style={{ position: 'absolute', bottom: "20px", width: '80%', marginLeft: '10%', zIndex: 2 }}>
      <form onSubmit={handleInputSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={inputValue ? inputValue : "Enter your prompt here"}
          style={{
            width: '100%',
            padding: '10px',
            fontFamily: 'pixeboy',
            fontSize: '20px',
            border: '2px solid white',
            borderRadius: '5px',
            backgroundColor: 'transparent',
            color: 'white',
          }}
        />
      </form>
    </div>
  );
}

export default ArtStylesComponent;