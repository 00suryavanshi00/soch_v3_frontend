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

const CrowSerp = () => {
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
                alt="Crows"
                src="https://media.giphy.com/media/u2R5zbiw4V7niu7z1r/giphy.gif"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            />


            <img
            width={200}
                alt="tree"
                src="https://media.giphy.com/media/Me15dPbub4gXFVlrky/giphy.gif"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            />
        
        
            <img
            width={100}
                alt="snake"
                src="https://o.remove.bg/downloads/a1fb1474-fbd7-4cf9-8d62-e4e9dcb23758/png-transparent-snake-animation-cartoon-snake-animals-photography-fauna-removebg-preview.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 

            <img
            width={100}
                alt="eggs"
                src="https://o.remove.bg/downloads/3228dfc0-0a7f-4ef3-b5ff-cdd886906ca6/eggs-bird-nest-tree-branch_1639-17467-removebg-preview.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 

            <img
            width={200}
                alt="necklace"
                src="https://o.remove.bg/downloads/8cc8a3fd-be3f-495a-bcbe-8b9919c446fa/pngtree-cartoon-hand-drawn-valentine-illustration-necklace-image_1319336-removebg-preview.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 

            <img
            width={200}
                alt="Soldier"
                src="https://o.remove.bg/downloads/d2483954-3d49-40fc-a8b6-c3183566c094/Soilder_Indian_Prv-removebg-preview.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 
            <p>Once upon a time there lived a crow couple, who had built a nest on the top of a tree. But unfortunately the tree was inhabited by a serpent at its bottom. So the serpent used to crawl up the tree and eat all the eggs that the lady crow used to lay. The crow couple were deeply grieved and when this happened time after time, then they decided that the serpent was to be get rid of by a plan.</p>
    
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

<CrowSerp />
  </Router>
);




export default CrowSerp;