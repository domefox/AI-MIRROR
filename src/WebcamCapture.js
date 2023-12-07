import React, {useState, useEffect} from 'react';
import Webcam from 'react-webcam';
import * as fal from "@fal-ai/serverless-client";


function WebcamCapture() {
  const webcamRef = React.useRef(null);

  const [image, setImage] = useState(null);
  fal.config({
    // Can also be auto-configured using environment variables:
    // Either a single FAL_KEY or a combination of FAL_KEY_ID and FAL_KEY_SECRET
    credentials: `84bf17d7-ed75-4782-a608-a7a165cf59e2:af97d58be14f1cb3fb1ec0b5917edd83`,
  });
  const connection = fal.realtime.connect("110602490-lcm-sd15-i2i", {
    clientonly:false,
    throttleInterval:0,
    connectionKey: '84bf17d7-ed75-4782-a608-a7a165cf59e2:af97d58be14f1cb3fb1ec0b5917edd83',
    onError: (error) => {
      console.error(error)
    },
    onResult: (result) => {
      if(result.images && result.images[0]){
        setImage(result.images[0].url);
      }
    }
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      connection.send({
        image_url: imageSrc, 
        prompt: "Make this picture look like a child drew it.",
        strength: 0.3,
        guidance_scale: 2,
        enable_safety_checks: false
      })
    }, 100);
  }, [image]);
  
  console.log(image)

  return(
    <div>
      <img 
        src = {image}
        alt="AI Generated" 
        style={{position: "absolute", top: "0", left: "0", width: "100vw", height: "100vh", objectFit: "contain"}} 
      />
      <Webcam ref={webcamRef} style={{position: "absolute", bottom: "0", right: "0", width: "200px", height: "150px"}} /> 
    </div>
  );
}

export default WebcamCapture;
