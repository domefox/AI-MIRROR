import WebcamCapture from './WebcamCapture.tsx';
import ArtStylesComponent from './ArtStylesComponent'; // Import the component
import React, { useRef, useState } from 'react';

function App() {
  const promptRef = useRef("test prompt");
  return (
    <div className="App">
      <WebcamCapture />
    </div>
  );
}

export default App;