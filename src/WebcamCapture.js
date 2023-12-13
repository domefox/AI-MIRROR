// /* eslint-disable @next/next/no-img-element */
// 'use client';
// that's relic next js code

import * as fal from '@fal-ai/serverless-client';
import { useEffect, useRef, useState } from 'react';

fal.config({
  proxyUrl: '/api/fal/proxy', // not sure if i still need this. do I pass in my API here?
});

const EMPTY_IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHPmzH8ACDADZKt3GNsAAAAASUVORK5CYII=';

// This function captures frames from the webcam and calls the onFrameUpdate callback with the frame data
const useWebcam = (videoRef, previewRef, onFrameUpdate, width = 512, height = 512) => {
  // This effect sets up the webcam
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current !== null) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      });
    }
  }, [videoRef]);

  // This function captures a frame from the webcam
  const captureFrame = () => {
    const canvas = previewRef.current;
    const video = videoRef.current;
    if (canvas === null || video === null) {
      return;
    }

    // Calculate the aspect ratio and crop dimensions
    const aspectRatio = video.videoWidth / video.videoHeight;
    let sourceX, sourceY, sourceWidth, sourceHeight;

    if (aspectRatio > 1) {
      // If width is greater than height
      sourceWidth = video.videoHeight;
      sourceHeight = video.videoHeight;
      sourceX = (video.videoWidth - video.videoHeight) / 2;
      sourceY = 0;
    } else {
      // If height is greater than or equal to width
      sourceWidth = video.videoWidth;
      sourceHeight = video.videoWidth;
      sourceX = 0;
      sourceY = (video.videoHeight - video.videoWidth) / 2;
    }

    // Resize the canvas to the target dimensions
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (context === null) {
      return;
    }

        // Draw the image on the canvas (cropped and resized)
        context.drawImage(
          video,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          width,
          height
        );
    
        // Callback with frame data
        if (onFrameUpdate) {
          canvas.toBlob(
            (blob) => {
              blob.arrayBuffer().then((buffer) => {
                const frameData = new Uint8Array(buffer);
                onFrameUpdate(frameData);
              });
            },
            'image/jpeg',
            0.7
          );
        }
      };
    
      // This effect runs the captureFrame function every 16ms
      useEffect(() => {
        const interval = setInterval(() => {
          captureFrame();
        }, 16); // Adjust interval as needed
    
        // Cleanup function to clear the interval when the component is unmounted
        return () => clearInterval(interval);
      });
    };
    
// This is the main component function
export default function WebcamPage({prompt}) {
  const [enabled, setEnabled] = useState(false);
  const processedImageRef = useRef(null);
  const videoRef = useRef(null);
  const previewRef = useRef(null);

  // Connect to the FAL serverless client
  const { send } = fal.realtime.connect(
    '110602490-sd-turbo-real-time-high-fps-msgpack',
    {
      connectionKey: 'camera-turbo-demo',
      // not throttling the client, handling throttling of the camera itself
      // and letting all requests through in real-time
      throttleInterval: 0,
      onResult(result) {
        if (processedImageRef.current && result.image) {
          const blob = new Blob([result.image], { type: 'image/jpeg' });
          const url = URL.createObjectURL(blob);
          processedImageRef.current.src = url;
        }
      },
    }
  );

  // This function is called every time a new frame is captured in line 83
  const onFrameUpdate = (data) => {
    if (!enabled) {
      return;
    }
    send({
      prompt: prompt,
      image: data,
      num_inference_steps: 3,
      strength: 0.44,
      guidance_scale: 1,
      seed: 6252023,
    });
  };

  // Initialize the webcam with the onFrameUpdate function
  useWebcam({
    videoRef,
    previewRef,
    onFrameUpdate,
  });

  // Render the component
  return (
    <main className="flex-col px-32 mx-auto my-20">
      <h1 className="text-4xl font-mono mb-8 text-current text-center">
        fal<code className="font-light text-pink-600">camera</code>
      </h1>
      <video ref={videoRef} style={{ display: 'none' }}></video>
      <div className="py-12 flex items-center justify-center">
        <button
          className="py-3 px-4 bg-indigo-700 text-white text-lg rounded"
          onClick={() => {
            setEnabled(!enabled);
          }}
        >
          {enabled ? 'Stop' : 'Start'}
        </button>
      </div>
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 justify-between">
        <canvas ref={previewRef} width="512" height="512"></canvas>
        <img
          ref={processedImageRef}
          src={EMPTY_IMG}
          width={512}
          height={512}
          className="min-w-[512px] min-h-[512px]"
          alt="generated"
        />
      </div>
    </main>
  );
}

