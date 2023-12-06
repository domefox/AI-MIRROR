import React from 'react';

function DisplayAI({ mirrorImage, currentStyle }) {
  return (
    <div>
      <img 
        src={mirrorImage} 
        alt="AI Generated" 
        style={{position: "absolute", top: "0", left: "0", width: "100vw", height: "100vh", objectFit: "cover"}} 
      />
      <div style={{position: "absolute", bottom: "50px", left: "50%", transform: "translateX(-50%)", color: "white"}}>
        {currentStyle.name} ({currentStyle.year})
      </div>
      <div style={{position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", color: "white"}}>
        {currentStyle.prompt}
      </div>
    </div>
  );
}

export default DisplayAI;