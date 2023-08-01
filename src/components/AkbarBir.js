import React from 'react'
import { createRoot } from "react-dom/client";
import { Stage, Layer, Image, Transformer } from "react-konva";
import {BrowserRouter as Router} from 'react-router-dom';
import useImage from "use-image";
import './Konva.css'
import Navbar from './Navbar';
import RecBut from './RecordingButtons';

// import Canvas from './Canvas'
// import SignaturePad from 'react-signature-canvas'


// function downloadURI(uri, name) {
//   var link = document.createElement('a');
//   link.download = name;
//   link.href = uri;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

const URLImage = ({ image,shapeProps, isSelected,onSelect,onChange}) => {
  const [img] = useImage(image.src);
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]); 
 

  return (
    <React.Fragment>
        
        <Image
            image={img}
            x={image.x}
            y={image.y}
            draggable="true"
            // I will use offset to set origin to the center of the image
            offsetX={img ? img.width / 2 : 0}
            offsetY={img ? img.height / 2 : 0}

            onClick={onSelect}
            onTap={onSelect}
            ref={shapeRef}
            
            {...shapeProps}
            onDragEnd={(e) => {
                onChange({
                    ...shapeProps,
                    x: e.target.x(),
                    y: e.target.y(),
                });
            }}          

            onTransformEnd={(e) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
                const node = shapeRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                // we will reset it back
                node.scaleX(1);
                node.scaleY(1);
                onChange({
                    ...shapeProps,
                    x: node.x(),
                    y: node.y(),
                    // set minimal value
                    width: Math.max(5, node.width() * scaleX),
                    height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                    }
                    return newBox;
                    }}
                />
            )}

    </React.Fragment>
    
  );
};

const AkbarBir = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const [selectedId, selectShape] = React.useState(null);



  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    // we also can save uri as file
    // but in the demo on TryA website it will not work
    // because of iframe restrictions
    // but feel free to use it in your apps:
    // downloadURI(uri, 'stage.png');
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };


  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute('download','canvas.png');
    let image = Stage.current.toDataURL('image/png');
    link.setAttribute('href',image)

  }


  return (
    <div>
      <Navbar/>
      <h3 className='compname'>Components for Your Story</h3>
      <br />

            <img
            width={120}
                alt="akbar"
                src="https://o.remove.bg/downloads/c920b844-df72-40c1-8863-d596694021e3/king-akbar-with-a-sword-3217432-2688938-removebg-preview.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            />


            <img
            width={200}
                alt="birbal"
                src="https://o.remove.bg/downloads/f76c9144-a105-4b9e-8e41-05e401e17eb9/birbal-cartoon-character-vector-38299361-removebg-preview.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            />
        
        
            <img
            width={200}
                alt="court"
                src="https://c4.wallpaperflare.com/wallpaper/129/151/707/akbar-s-royal-bathing-chamber-delhi-india-wallpaper-preview.jpg"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 

            <img
            width={100}
                alt="well"
                src="https://o.remove.bg/downloads/98927798-5dd1-468f-bb54-0348c08d894e/istockphoto-697267582-612x612-removebg-preview.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 

            <img
            width={200}
                alt="farmer"
                src="https://o.remove.bg/downloads/2633cb9b-72c0-4b9a-a39f-4e86eed5e0b8/pngtree-cartoon-indian-farmer-png-image_3962670-removebg-preview.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 

            <img
            width={200}
                alt="merchent"
                src="https://o.remove.bg/downloads/c5d18448-2ae6-4bcb-968a-0d300b1fe821/171146889-balloons-seller-is-standing-with-greet-hand-vector-graphic-illustration-individually-on-white-removebg-preview.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 
            <p>Once a Farmer bought a well from a rich merchent to irrigate his farm, After paying for it, when he came the next day the merchent did not allow him to draw water as he said that he paid for the well not the water.</p>
    
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current
              }
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        
        <Stage className='stage'
          height={600}
          width={880}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          style={{ border: "2px solid grey" }}
          ref={stageRef}
        >
          <Layer>
            
            {images.map((image,i) => {
              return (
                
                <URLImage
                    key={i}
                    image={image} 
                    shapeProps={image}
                    isSelected={image.id === selectedId}
                    onSelect={() => {
                        selectShape(image.id);
                    }}
                    onChange={(newAttrs) => {
                        const imgs = images.slice();
                        imgs[i] = newAttrs;
                        setImages(imgs);
                    }}

               />
              );
            })}
          </Layer>
        </Stage>
        <RecBut/>
        {/* <Navbar/> */}
        {/* <button className='save-but' >Save</button> */}
        <a className='save-but' href='try'>Save Your Imagination</a>
      </div>        
    </div>

  );
};


 const container = document.getElementById("root");



// const container = document.getElementById('save').addEventListener(
//         'click',
//         function () {
//           var dataURL = Stage.toDataURL();
//           downloadURI(dataURL, 'stage.png');
//         },
//         false
//       );
const root = createRoot(container);
root.render(
  <Router>

<AkbarBir />
  </Router>
);




export default AkbarBir;