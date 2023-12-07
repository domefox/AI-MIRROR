import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture';
import Api from './api';

function App() {
  const [capturedImage, setCapturedImage] = useState(null);

  return (
    <div className="App">
      <WebcamCapture setCapturedImage={setCapturedImage} />
      <Api frame={capturedImage} />
    </div>
  );
}

export default App;
