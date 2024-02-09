import WebcamCapture from './WebcamCapture';
import ArtStylesComponent from './ArtStylesComponent'; // Import the component
import React, { useRef } from 'react';

function App() {
  const promptRef = useRef("test prompt");
  return (
    <div className="App">
      <ArtStylesComponent setPrompt={promptRef} />
      <WebcamCapture prompt={promptRef} />
    </div>
  );
}

export default App;