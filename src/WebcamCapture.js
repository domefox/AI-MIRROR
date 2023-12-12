import React, {useState, useEffect} from 'react';
import Webcam from 'react-webcam';
import * as fal from "@fal-ai/serverless-client";


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
      console.log(prompt.current);
      connection.send({
        image_url: imageSrc,
        prompt: prompt.current,
        strength: 0.2,
        guidance_scale: 1,
        seed: 42,
        num_inference_steps: 6,
        sync_mode: 1,
        negative_prompt: "deformed, ugly, blurry, low resolution",
        enable_safety_checks: false,
      });
    }, 100); // Changed to 1000 for 1 second interval

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Removed image from dependency array
  
  console.log(image)

  return(
    <div>
      <img 
        src = {image}
        className="mirrored-image"
        alt="tinted mirror" 
        style={{position: "absolute", top: "0", left: "0", width: "100vw", height: "100vh", objectFit: "cover", zIndex: 1}} 
      />
      <Webcam
        ref={webcamRef}  
        className="mirrored-image"
        videoConstraints={{width: 512, height: 512}} 
        screenshotFormat="image/jpeg"
        style={{position: "absolute", top: "0", right: "0", width: "200px", height: "150px", zIndex: 3}} /> 
    </div>
  );
}

export default WebcamCapture;