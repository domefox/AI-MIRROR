// checking I have updated properly

import * as fal from "@fal-ai/serverless-client";


export function Api({frame, setMirrorImage, currentStyle}) {
  //console.log('generateImage is called'); // Add this line
  try {
    fal.config({
      // Can also be auto-configured using environment variables:
      // Either a single FAL_KEY or a combination of FAL_KEY_ID and FAL_KEY_SECRET
      credentials: `84bf17d7-ed75-4782-a608-a7a165cf59e2:af97d58be14f1cb3fb1ec0b5917edd83`,
    });
    const connection = fal.realtime.connect("110602490-lcm-sd15-i2i", {
      connectionKey: '84bf17d7-ed75-4782-a608-a7a165cf59e2:af97d58be14f1cb3fb1ec0b5917edd83',
      onError: (error) => {
        console.error(error)
      },
      onResult: (result) => {
        if(result.images && result.images[0]){
          setMirrorImage(result.images[0].url);
        }
      }
    });

    connection.send({
      image_url: frame, 
      prompt: currentStyle.prompt,
      strength: 0.5,
      guidance_scale: 2,
      negative_prompt: "blurry, low resolution",
      enable_safety_checks: false
    });

  } catch (error) {
    console.error('Error in generateImage:', error);
  }
}

export default Api;

