export default function sketch(p5, setPrompt) {
    let sliderX; 
    let sliderY; 
    let sliderLength; 
    let sliderValue = 0; 
    let isDragging = false; 
    let lastUpdateTime = 0;
    let currentPrompt = null; // Add this line at the top of your sketch function
    let font;
  
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
        { name: "Cubism", displayYear: "1907 - 1920s", sliderYear: 86.04, prompt: "abstract angular minimal Cubist Picasso painting, colorful" },
        { name: "Surrealism", displayYear: "1920s - 1950s", sliderYear: 87.60, prompt: "Salvador Dali surrealist desert painting" },
        { name: "Abstract Expressionism", displayYear: "1940s - 1960s", sliderYear: 90.01, prompt: "abstract Pollock action painting" },
        { name: "Pop Art", displayYear: "1950s - 1970s", sliderYear: 91.21, prompt: "Andy Warhol multiple colored, Lichtenstein comic" },
        { name: "Postmodernism", displayYear: "1960s - 1980s", sliderYear: 92.42, prompt: "minimal, squares, blocks of colors, Rothko, Mondrian" },
        { name: "Neoexpressionism", displayYear: "1980s - 2000s", sliderYear: 94.82, prompt: "Basquiat, Keith Haring comic book type painting" },
        { name: "Y2K", displayYear: "2000-2006", sliderYear: 97.23, prompt: "Y2K aesthetic, 8-bit aesthetic, colorful" },
        { name: "NFT Art", displayYear: "2017-2022", sliderYear: 99.28, prompt: "Bored Apes, Cryptopunk NFTs" },
        { name: "Refik Anadol", displayYear: "2019-Present", sliderYear: 99.52, prompt: "Refik Anadol AI art" },
        { name: "Future", displayYear: "Present-?", sliderYear: 100.00, prompt: "abstract art of the future" }
      ];

    p5.preload = () => {
      font = p5.loadFont('/Pixeboy.ttf');
    }
    p5.setup = () => {
      p5.textFont(font);
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      sliderLength = p5.width - 100;
      sliderX = p5.windowWidth / 2 - sliderLength / 2;
      sliderY = p5.windowHeight - 30;
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      sliderLength = p5.windowWidth - 100;
    };
  
    p5.draw = () => {
      p5.clear();
      if (!isDragging && p5.millis() - lastUpdateTime > 15000) {
        sliderValue += sliderLength / 20;
        sliderValue = sliderValue % sliderLength;
        lastUpdateTime = p5.millis();
      }

  
      drawSlider();
      displayArtStyleInfo();

      // console.log(currentIndex);

    };
  
    function drawSlider() {
      p5.stroke(255);
      p5.strokeWeight(3);
      p5.line(sliderX, sliderY, sliderX + sliderLength, sliderY);
  
      let arrowSize = 10;
      let endX = sliderX + sliderLength;
      p5.line(endX, sliderY, endX - arrowSize, sliderY - arrowSize);
      p5.line(endX, sliderY, endX - arrowSize, sliderY + arrowSize);
  
      if (isDragging) {
        sliderValue = p5.constrain(p5.mouseX - sliderX, 0, sliderLength);
      }
  
      let segmentLength = sliderLength / 20;
      let nearestIndex = p5.round(sliderValue / segmentLength);
      sliderValue = nearestIndex * segmentLength;
      sliderValue = p5.min(sliderValue, sliderLength - segmentLength);
  
      p5.fill(255);
      p5.strokeWeight(0);
      p5.ellipse(sliderX + sliderValue, sliderY, 20, 20);

    }
  
    function displayArtStyleInfo() {
      let index = p5.round(p5.map(sliderValue, 0, sliderLength, 0, ArtStyles.length - 1));
      index = p5.constrain(index, 0, ArtStyles.length - 1);
  
      let artStyle = ArtStyles[index];
      p5.fill(255);
      p5.textSize(24);
      p5.textAlign(p5.CENTER);
      p5.text(`${artStyle.name} (${artStyle.displayYear})`, p5.windowWidth/2, p5.windowHeight-70);

      // If the index has changed, update the prompt
      if (ArtStyles[index] && ArtStyles[index].prompt !== currentPrompt) {
        currentPrompt = ArtStyles[index].prompt;
        setPrompt.current = currentPrompt;
      }
      // console.log(currentPrompt);
    }
  
    p5.mousePressed = () => {
      let d = p5.dist(p5.mouseX, p5.mouseY, sliderX + sliderValue, sliderY);
      if (d < 10) {
        isDragging = true;
      }
    };
  
    p5.mouseReleased = () => {
      isDragging = false;
    };
  }
  