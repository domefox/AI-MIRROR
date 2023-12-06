import React from 'react';
import Webcam from 'react-webcam';

function WebcamCapture({ setCapturedImage }) {
  const webcamRef = React.useRef(null);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

  // webcam hidden so doesn't show up, but is still used to get still frames
  return (
    <div>
      <Webcam ref={webcamRef} style={{position: "absolute", bottom: "0", right: "0", width: "200px", height: "150px", visibility: "hidden"}} /> 
    </div>
  );
}

export default WebcamCapture;
