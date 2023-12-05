import * as fal from "@fal-ai/serverless-client";

export async function generateImage(frame) {
  console.log('generateImage is called'); // Add this line
  try {
    const response = await fal.subscribe("110602490-lcm-sd15-i2i", {
      input: {
        prompt: 'abstract cubist painting in the style of picasso',
        image_url: frame,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    console.log(response.images[0].url); // Log the output
    return response.images[0].url;
  } catch (error) {
    console.error('Error in generateImage:', error);
  }
}

// see below for the API docs:

/*
CALLING THE API
The API follows common HTTP semantics and should work with the language of your preference. Bellow you will find the API endpoint and some code snippets to help you get started:

https://110602490-lcm-sd15-i2i.gateway.alpha.fal.ai - Javascript

import * as fal from "@fal-ai/serverless-client";

const result = await fal.subscribe("110602490-lcm-sd15-i2i", {
  input: {
    prompt: "an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea"
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
For requests that take longer than several seconds, checkout our queue and webhook features. Our JS and Python clients use the queue behind the scenes. Head to our client page in our documenation site to read more about our Python and Javascript clients.

Authentication guidelines
The snippets above assume your have the FAL_KEY_ID and FAL_KEY_SECRET variable set in your environment. Make sure you check out our docs to find out more about our API and how to manage authentication, long-running requests and more.
INPUT
prompt*string
The prompt to use for generating the image. Be as descriptive as possible for best results.

Examples:

"an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea"
image_urlstring
The image to use as a base.

Examples:

"https://storage.googleapis.com/falserverless/model_tests/lcm/source_image.png"
strengthfloat
The strength of the image. Default value: 0.8

negative_promptstring
The negative prompt to use.Use it to address details that you don't want in the image. This could be colors, objects, scenery and even the small details (e.g. moustache, blurry, low resolution). Default value: ""

Examples:

"cartoon, illustration, animation. face. male, female"
"ugly, deformed"
seedinteger
The same seed and the same prompt given to the same version of Stable Diffusion will output the same image every time.

guidance_scalefloat
The CFG (Classifier Free Guidance) scale is a measure of how close you want the model to stick to your prompt when looking for a related image to show you. Default value: 1

num_inference_stepsinteger
The number of inference steps to use for generating the image. The more steps the better the image will be but it will also take longer to generate. Default value: 4

sync_modeboolean
If set to true, the function will wait for the image to be generated and uploaded before returning the response. This will increase the latency of the function but it allows you to get the image directly in the response without going through the CDN.

num_imagesinteger
The number of images to generate. The function will return a list of images with the same prompt and negative prompt but different seeds. Default value: 1

enable_safety_checksboolean
If set to true, the resulting image will be checked whether it includes any potentially unsafe content. If it does, it will be replaced with a black image. Default value: true

request_idstring
An id bound to a request, can be used with response to identify the request itself. Default value: ""

Input sample:
{
  "prompt": "an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea",
  "image_url": "https://storage.googleapis.com/falserverless/model_tests/lcm/source_image.png",
  "strength": 0.8,
  "negative_prompt": "cartoon, illustration, animation. face. male, female",
  "seed": 42,
  "guidance_scale": 1,
  "num_inference_steps": 4,
  "sync_mode": 0,
  "num_images": 1,
  "enable_safety_checks": true,
  "request_id": ""
}
OUTPUT
images*list<Image>
The generated image files info.

timings*Timings
seed*integer
Seed of the generated Image. It will be the same value of the one passed in the input or the randomly generated that was used in case none was passed.

num_inference_stepsinteger
Number of inference steps used to generate the image. It will be the same value of the one passed in the input or the default one in case none was passed. Default value: 4

request_idstring
An id bound to a request, can be used with response to identify the request itself. Default value: ""

Output sample:
{
  "images": [
    {
      "url": "",
      "width": 0,
      "height": 0,
      "content_type": "image/jpeg"
    }
  ],
  "seed": 0,
  "num_inference_steps": 4,
  "request_id": ""
}
ERROR TYPES
Some errors may also contain a JSON payload with additional details. In this section you can find the possible error types and their properties.

ValidationError
When input validation fails, the API will response with a 422 status and an array of ValidationError object in the response body. The ValidationError object will contain a list of errors, each with a loc (location) attribute that indicates the path to the invalid input, and a msg (message) attribute that describes the error.

loc*list<string | integer>
msg*string
type*string
TYPES
Image
url*string
width*integer
height*integer
content_typestring
Default value: "image/jpeg"

*/
