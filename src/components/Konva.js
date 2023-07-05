import React from 'react'
import { createRoot } from "react-dom/client";
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";
import './Konva.css'
import Navbar from './Navbar';
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
            draggable
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

const Konva = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const [selectedId, selectShape] = React.useState(null);



  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    // we also can save uri as file
    // but in the demo on Konva website it will not work
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
      
      <h3 className='compname'>Components for Your 
      Story</h3>
      
      <br />

            <img
            width={200}
                alt="sky"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Color_icon_Light_Cornflower_blue.svg/1024px-Color_icon_Light_Cornflower_blue.svg.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            />


            <img
            width={200}
                alt="crow"
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
                alt="pot"
                src="https://media.giphy.com/media/tkJo9hedswdDMk7AVI/giphy.gif"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 

            <img
            width={200}
                alt="clouds"
                src="https://media.giphy.com/media/dByKTOKy3msWmAx2V4/giphy.gif"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 

            <img
            width={200}
                alt="one_pebbles"
                src="https://www.pngall.com/wp-content/uploads/2017/03/Pebble-Stone-Download-PNG.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> 

            <p>There was a Thirsty crow flying in the sky in search of water, it saw a pot of water. It thought to throw the pebbles in it to make the water come on top. Thus drink Water and quench its Thirst</p>
    
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
      
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
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
        {/* <button className='save-but' >Save</button> */}
        <a className='save-but' href='try'>Save your Imagination</a>
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
root.render(<Konva />);




export default Konva