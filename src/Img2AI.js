import { useEffect } from 'react';
import { generateImage } from './api';

function Img2Ai({ capturedImage, setMirrorImage }) {

  useEffect(() => {
    const fetchImage = async () => {
      const newImage = await generateImage(capturedImage);
      setMirrorImage(newImage);
    };
    fetchImage();
  }, [capturedImage]);

  return null;
}

export default Img2Ai;
