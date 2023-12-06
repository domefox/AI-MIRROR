import React, { useState, useEffect } from 'react';
import DisplayAI from './DisplayAI';
import WebcamCapture from './WebcamCapture';
import Api from './api';
import { ArtStyles } from './ArtStyles';

function App() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [mirrorImage, setMirrorImage] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStyle((currentStyle + 1) % ArtStyles.length);
    }, 15000);
    return () => clearInterval(intervalId);
  }, [currentStyle]);

  return (
    <div className="App">
      <DisplayAI mirrorImage={mirrorImage} currentStyle={ArtStyles[currentStyle]} />
      <WebcamCapture setCapturedImage={setCapturedImage} />
      <Api frame={capturedImage} setMirrorImage={setMirrorImage} currentStyle={ArtStyles[currentStyle]} />
    </div>
  );
}

export default App;