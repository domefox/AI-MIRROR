import React, { useState, useEffect } from 'react';
import { ArtStyles } from './ArtStyles';
import WebcamCapture from './WebcamCapture';

function App() {
  const [currentStyle, setCurrentStyle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStyle((currentStyle + 1) % ArtStyles.length);
    }, 15000);
    return () => clearInterval(intervalId);
  }, [currentStyle]);


  return (
    <div className="App">
      <WebcamCapture currentStyle={ArtStyles[currentStyle]} />
    </div>
  );
}

export default App;
