import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import ArtStylesSlider from './ArtStylesSlider'; // Import your sketch function


function ArtStylesComponent(props) {
  return (
    <div style={{ position: 'absolute', zIndex: 2}}>
      <ReactP5Wrapper sketch={(p5) => ArtStylesSlider(p5, props.setPrompt)} />
    </div>
  );
}

export default ArtStylesComponent;