import React, {useState, useEffect} from 'react';
import Webcam from 'react-webcam';
import * as fal from "@fal-ai/serverless-client";

const ArtStyles = [
  { name: "Lascaux", displayYear: "17k - 15k BC", sliderYear: 0.00, prompt: "minimal angular abstract shapes with very little detail, Lascaux cave painting" },
  { name: "Egyptian", displayYear: "3k - 30 BC", sliderYear: 19.02, prompt: "minimal, abstract, simple flat two-dimensional Egyptian hieroglyph symbol on stone wall" },
  { name: "Antiquity", displayYear: "400 BC - 500 AD", sliderYear: 22.55, prompt: "classical antiquity statue" },
  { name: "Medieval", displayYear: "500 - 1400 AD", sliderYear: 23.78, prompt: "Christ Pantocrator (Sinai) (500 – 600)" },
  { name: "Renaissance", displayYear: "1400 - 1600", sliderYear: 25.00, prompt: "The Last Supper, Sistine Chapel, Birth of Venus, Mona Lisa" },
  { name: "Baroque", displayYear: "1600 - 1750", sliderYear: 49.08, prompt: "Las Meninas, The Night Watch, The Calling of Saint Matthew (Caravaggio), The Conversion of Saint Paul" },
  { name: "Rococo", displayYear: "1730 - 1770", sliderYear: 64.73, prompt: "\"The Swing\" - Jean-Honoré Fragonard, \"Pilgrimage to Cythera\" - Antoine Watteau, \"The Embarkation for Cythera\" - Jean-Antoine Watteau" },
  { name: "Neoclassicism", displayYear: "1760 - 1840", sliderYear: 68.34, prompt: "\"The Oath of the Horatii\" - Jacques-Louis David, \"Napoleon Crossing the Alps\" - Jacques-Louis David" },
  { name: "Romanticism", displayYear: "1800 - 1850", sliderYear: 73.15, prompt: "\"Wanderer above the Sea of Fog\" - Caspar David Friedrich, \"The Slave Ship\" - J.M.W. Turner, \"The Third of May 1808\" - Francisco Goya" },
  { name: "Impressionism", displayYear: "1860 - 1890", sliderYear: 80.38, prompt: "Monet flower fillies, Vincent van Gogh painting" },
  { name: "Cubism", displayYear: "1907 - 1920s", sliderYear: 86.04, prompt: "abstract angular Cubist Picasso painting" },
  { name: "Surrealism", displayYear: "1920s - 1950s", sliderYear: 87.60, prompt: "Salvador Dali surrealist desert painting" },
  { name: "Abstract Expressionism", displayYear: "1940s - 1960s", sliderYear: 90.01, prompt: "abstract Pollock action painting" },
  { name: "Pop Art", displayYear: "1950s - 1970s", sliderYear: 91.21, prompt: "Andy Warhol multiple color, Lichtenstein comic" },
  { name: "Postmodernism", displayYear: "1960s - 1980s", sliderYear: 92.42, prompt: "simple squares, block colors, Rothko, Mondrian" },
  { name: "Neoexpressionism", displayYear: "1980s - 2000s", sliderYear: 94.82, prompt: "Basquiat, Keith Haring type painting" },
  { name: "Y2K", displayYear: "2000-2006", sliderYear: 97.23, prompt: "Y2K aesthetic, 8-bit aesthetic, colorful" },
  { name: "NFT Art", displayYear: "2017-2022", sliderYear: 99.28, prompt: "Bored Apes, Cryptopunk NFTs" },
  { name: "Refik Anadol", displayYear: "2019-Present", sliderYear: 99.52, prompt: "Refik Anadol AI art" },
  { name: "Future", displayYear: "Present-?", sliderYear: 100.00, prompt: "abstract art of the future" }
];


function WebcamCapture() {
  const webcamRef = React.useRef(null);

  const [image, setImage] = useState(null);
  const [promptIndex, setPromptIndex] = useState(0); // New state variable



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
      const prompt = ArtStyles[promptIndex].prompt;
      console.log('Sending prompt:', prompt); // Log the prompt value
      connection.send({
        image_url: imageSrc, 
        prompt: prompt,
        strength: 0.1,
        guidance_scale: 1,
        negative_prompt: "blurry, low resolution",
        enable_safety_checks: false
      })
    }, 50);
  }, [image, promptIndex]); // Add promptIndex to the dependency array


  // New useEffect hook
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPromptIndex((prevIndex) => {
        if (prevIndex === ArtStyles.length - 1) {
          return 0; // Reset to 0 if we've reached the end of the array
        } else {
          return prevIndex + 1; // Otherwise, increment the index
        }
      });
    }, 15000); // Change the prompt every 15 seconds

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array so this runs once on mount and not on every re-render

  
  console.log(image)

  return(
    <div>
      <img 
        src = {image}
        alt="AI Generated" 
        style={{position: "absolute", top: "0", left: "0", width: "100vw", height: "100vh", objectFit: "cover"}} 
      />
      <Webcam ref={webcamRef} style={{position: "absolute", bottom: "0", right: "0", width: "200px", height: "150px", visibility: "hidden"}} /> 
      <div style={{position: "absolute", bottom: "25px", left: "60px", right: "60px", height: "5px", backgroundColor: "#ffffff"}}></div>
      <div style={{
        position: "absolute", 
        bottom: "60px", 
        left: "50%", 
        transform: "translateX(-50%)", 
        color: "#fff", 
        textAlign: "center"
      }}>
        {ArtStyles[promptIndex].name} ({ArtStyles[promptIndex].displayYear}) {ArtStyles[promptIndex].prompt}
      </div>
    </div>
  );
}

export default WebcamCapture;
