import React, { useState } from 'react';
import DisplayAI from './DisplayAI';
import WebcamCapture from './WebcamCapture';
import Img2AI from './Img2AI';

function App() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [mirrorImage, setMirrorImage] = useState(null);

  return (
    <div className="App">
      <DisplayAI mirrorImage={mirrorImage} />
      <WebcamCapture setCapturedImage={setCapturedImage} />
      <Img2AI capturedImage={capturedImage} setMirrorImage={setMirrorImage} />
    </div>
  );
}

export default App;
