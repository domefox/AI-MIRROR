import React, {useState, useEffect, useRef} from 'react';
import Webcam from 'react-webcam';
import * as fal from "@fal-ai/serverless-client";


function WebcamCapture({currentStyle}) {
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

  const currentStyleRef = useRef(currentStyle); // Add this line

  useEffect(() => {
    currentStyleRef.current = currentStyle; // Update the ref each time currentStyle changes
  }, [currentStyle]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(`Current prompt: ${currentStyle.prompt}`);
      connection.send({
        image_url: imageSrc, 
        prompt: currentStyle.prompt,
        strength: 0.2,
        guidance_scale: 1,
        negative_prompt: "blurry, low resolution",
        enable_safety_checks: false
      })
    }, 100);
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array
  console.log(image)

  return(
    <div>
      <img 
        src = {image}
        alt="AI Generated" 
        style={{position: "absolute", top: "0", left: "0", width: "100vw", height: "100vh", objectFit: "contain"}} 
      />
      <Webcam
        ref={webcamRef}  
        videoConstraints={{width: 512, height: 512}} 
        screenshotFormat="image/jpeg"
        style={{position: "absolute", bottom: "0", right: "0", width: "200px", height: "150px"}} /> 
      <div style={{position: "absolute", bottom: "50px", left: "50%", transform: "translateX(-50%)", color: "white"}}>
        {currentStyle.name} ({currentStyle.displayYear})
      </div>
    </div>
  );
}

export default WebcamCapture;