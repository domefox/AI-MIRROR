import React, { useState } from 'react';

function ArtStylesComponent({ setPrompt }) {
  const [inputValue, setInputValue] = useState('');

  const prompts = [
    "Art Deco Portrait",
    "Cyberpunk Neon Cityscape",
    "Angular Cubist Colorful Picasso Painting",
    "Roman Statue of Caesar",
    "Medusa",
    "Lebron wearing a crown",
    "Kim Jong Un",
    "Donald Trump",
    "naruto",
    "japanese traditional dress",
    "Japanese Ukiyo-e Print",
    "The typical american",
    "the average patriotic american",
    "Surrealist Dreamscape in the desert, dali",
    "Ancient Egyptian Hieroglyphics",
    "Pop Art à la Andy Warhol",
    "Nordic Viking Runes, thor",
    "Art Nouveau Illustration",
    "the great gatsby, the roaring 20s.",
    "Afrofuturism Portrait",
    "Futuristic Holographic spacesuit",
    "Traditional Chinese Ink Painting",
    "Traditional Chinese watercolor scene of nature",
    "moscow in the year 3024, with the kremlin in the background",
    "ancient chinese people wearing off-white by virgil abloh",
    "the fashion of the year 3000 AD",
    "the foundation trilogy",
    "middle eastern chic fashion",
    "a queen chess piece",
    "the minotaur",
    "the elephant in the room",
    "the fox in the henhouse",
    "drake (2013 nothing was the same)",
    "travis scott",
    "the emperor of the milky way",
    "pikachu! pika pika",
    "the goat"
  ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    setPrompt.current = inputValue;
  };

  const handleRandomPrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setInputValue(randomPrompt);
    setPrompt.current = randomPrompt;
  };

  return (
    <div style={{ position: 'absolute', bottom: "20px", width: '52vh', left: '20%', transform: 'translateX(-50%)', zIndex: 2 }}>
      <form onSubmit={handleInputSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={inputValue ? inputValue : "Enter your prompt here"}
          style={{
            display: "none",
            width: '100%',
            padding: '10px',
            fontFamily: 'pixeboy',
            fontSize: '20px',
            border: '2px solid black',
            borderRadius: '10px',
            backgroundColor: 'transparent',
            color: 'black',
          }}
        />
        <button
          type="button"
          onClick={handleRandomPrompt}
          style={{
            display: "none",
            width: '8%',
            marginLeft: '2%',
            padding: '10px',
            fontFamily: 'pixeboy',
            fontSize: '20px',
            border: '2px solid white',
            borderRadius: '10px',
            backgroundColor: 'transparent',
            color: 'white',
            maxWidth: 'calc(100vh * (16/9) * 0.08)', // 8% of 100 * (16/9) vh
          }}
        >
          ?
        </button>
      </form>
    </div>
  );
}

export default ArtStylesComponent;