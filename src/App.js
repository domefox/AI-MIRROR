import React, { useState } from 'react';
import DisplayAI from './DisplayAI';
import WebcamCapture from './WebcamCapture';
import Api from './api';

function App() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [mirrorImage, setMirrorImage] = useState(null);

  return (
    <div className="App">
      <DisplayAI mirrorImage={mirrorImage} />
      <WebcamCapture setCapturedImage={setCapturedImage} />
      <Api frame={capturedImage} setMirrorImage={setMirrorImage} />
    </div>
  );
}

export default App;
