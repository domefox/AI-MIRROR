import WebcamCapture from './WebcamCapture';
import ArtStylesComponent from './ArtStylesComponent'; // Import the component
import React, { useState } from 'react';


function App() {
  const [prompt, setPrompt] = useState("test prompt");

  return (
    <div className="App">
      <ArtStylesComponent setPrompt={setPrompt} />
      <WebcamCapture prompt={prompt} />
    </div>
  );
}

export default App;
