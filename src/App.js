import WebcamCapture from './WebcamCapture';
import ArtStylesComponent from './ArtStylesComponent'; // Import the component
import React, { useRef, useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState("test prompt");
  const setPromptRef = useRef(setPrompt);

  return (
    <div className="App">
      <ArtStylesComponent setPromptRef={setPromptRef} />
      <WebcamCapture prompt={prompt} />
    </div>
  );
}

export default App;