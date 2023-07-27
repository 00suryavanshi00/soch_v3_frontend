import React from 'react';
import { Stage, Layer, Image } from 'react-konva';

const DragDropCanvas = () => {
  const [images, setImages] = React.useState([
    // Array of GIF URLs or image URLs
    // Example: 'https://path/to/your/gif.gif'
  ]);

  const handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };

  const handleDragEnd = (e) => {
    e.target.to({
      duration: 0.5,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const imageUrl = e.dataTransfer.getData('URL');
    const image = new window.Image();
  
    image.onload = () => {
      setImages((prevImages) => [
        ...prevImages,
        {
          id: Date.now(),
          url: imageUrl,
          image, // Store the image object itself in the state
          width: image.width,
          height: image.height,
          x: e.clientX - image.width / 2,
          y: e.clientY - image.height / 2,
        },
      ]);
    };
  
    image.src = imageUrl; // Start loading the image
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: '100%', height: '100%' }}
    >
      <Stage width={window.innerWidth} height={window.innerHeight} style={{ border: "2px solid grey" }}>
      
        <Layer>
          {images.map((image) => (
            <Image
              key={image.id}
              image={image}
              draggable 
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );   
};

export default DragDropCanvas;
