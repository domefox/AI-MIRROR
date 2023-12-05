import React from 'react';

function DisplayAI({ mirrorImage }) {
  return (
    <img 
      src={mirrorImage} 
      alt="AI Generated" 
      style={{position: "absolute", top: "0", left: "0", width: "100vw", height: "100vh", objectFit: "contain"}} 
    />
  );
}

export default DisplayAI;