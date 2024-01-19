import { Buffer } from 'buffer';
import React, {useState, useEffect} from 'react';
import Webcam from 'react-webcam';
import * as fal from "@fal-ai/serverless-client";

global.Buffer = Buffer;

function WebcamCapture({prompt}) {
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
    connectionKey: 'camera-turbo-demo',
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
      console.log(imageSrc);
      connection.send({
        image_url: imageSrc,
        prompt: prompt.current,
        strength: .8,
        guidance_scale: 1,
        seed: 1000,
        num_inference_steps: 3,
        sync_mode: 1,
        negative_prompt: "people, deformed, ugly, blurry, low resolution",
        enable_safety_checks: false,
      });
    }, 100); // Changed to 1000 for 1 second interval

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Removed image from dependency array
  
  console.log(image)

  return(
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", backgroundColor: "white"}}>
      <img 
        src={image}
        className="mirrored-image"
        alt="tinted mirror" 
        style={{width: "56.25vh", height: "100vh", objectFit: "cover", zIndex: 1}} 
      />
      <Webcam
        ref={webcamRef}  
        className="mirrored-image"
        forceScreenshotSourceSize
        videoConstraints={{width: 512, height: 512}} 
        screenshotFormat="image/jpeg"
        style={{width: "15vh", height: "15vh", position: "absolute", top: 20, right: 790, zIndex: 2,
        border: '3px solid white', borderRadius: '10px',}} 
      />
    </div>
  );
}

export default WebcamCapture;