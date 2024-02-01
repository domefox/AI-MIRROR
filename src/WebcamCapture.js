import { Buffer } from 'buffer';
import React, {useState, useEffect, useRef} from 'react';
import Webcam from 'react-webcam';
import * as fal from "@fal-ai/serverless-client";

global.Buffer = Buffer;

function WebcamCapture() {
  const webcamRef = React.useRef(null);
  const prompt = useRef(null);

  const [image, setImage] = useState(null);
  const [index, setIndex] = useState(0);

  const prompts = useMemo(() => [
    "Cherry Blossoms, Japanese Edo Period Art Nature Landscape",
    "Fauvist Matisse Flower Field",
    "Monet flower field",
    "flowers with saturn's rings around the petals",
    "flowers in Angular Cubist Colorful picasso style",
    "2001 a space odyssey",
    "abstract georgia o'keeffe flowers in springtime",
    "star wars stormtroopers",
    "coachella",
    "the last supper",
    "the fall of rome",
    "cyberpunk underground neon party"
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % prompts.length);
    }, 5000); // Change every 20 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [prompts.length]);

  useEffect(() => {
    prompt.current = prompts[index];
  }, [index, prompts]);

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
      // console.log(imageSrc);
      connection.send({
        image_url: imageSrc,
        prompt: prompt.current,
        strength: 0.7,
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
  }, [prompt,connection]); // Add prompt to the dependency array
  
  console.log(image)

  // Function to handle the next prompt
  const handleNextPrompt = () => {
    setIndex((prevIndex) => (prevIndex + 1) % prompts.length);
  };

  return(
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", backgroundColor: "white"}}>
      <img 
        src={image}
        className="mirrored-image"
        alt="tinted mirror" 
        style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1}} 
      />
      <Webcam
        ref={webcamRef}  
        className="mirrored-image"
        forceScreenshotSourceSize
        videoConstraints={{width: 512, height: 512}} 
        screenshotFormat="image/jpeg"
        style={{width: "15vh", height: "15vh", position: "absolute", top: 20, right: 40, zIndex: 2,
        border: '3px solid white', borderRadius: '10px'}} 
      />
      <div style={{position: "absolute", top: "calc(20px + 20vh)", right: 40, zIndex: 2, color: "white", fontSize: "20px"}}>
        {prompt.current}
      </div>
      <button onClick={handleNextPrompt} style={{position: "absolute", top: "calc(20px + 25vh)", right: 40, zIndex: 2, padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer'}}>
        Next Prompt
      </button>
    </div>
  );
}

export default WebcamCapture;


// Cherry Blossoms, Japanese Edo Period Art Nature Landscape
// Fauvist Matisse Flower Field
// Monet flower field 
//