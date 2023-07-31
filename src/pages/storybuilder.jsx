import { useState } from 'react';
import { DalleResult } from '../components/dalleResult'
import DropDownMenu from '../components/DropDownMenu'
import Navbar from '../components/Navbar'
import { GIPHY } from '../components/giphy';
import DragDropCanvas from '../components/canvas';
import Konva from '../components/Konva';
import ThirstyC from '../components/testarray';
import './storybuilder.css'

// import DropDownMenu from 'react-bootstrap/esm/DropDownMenu'

export function StoryBuilder(){

    let [selectedCategory, setSelectedCategory] = useState('Background');
    let [selectedStickers, setSelectedStickers] = useState([]);
    let [selectedBackground, setSelectedBackground] = useState('');

    let updatedStickers = [];

    let handleDropDown = (selectedOption) => {
        setSelectedCategory(selectedOption);
    }

    const handleSelectedStickersChange = (selectedStickers) => {
        // Update the selectedStickers array in the parent component
        setSelectedStickers(selectedStickers);
      };

    let handleSelectedBackground = (selectedImage)=>{
        setSelectedBackground(selectedImage);
    }

return (
    <>
    <div>
        <Navbar/>
        <div>
        <DropDownMenu selectedOption = {selectedCategory} onChange = {handleDropDown}/>
        {selectedCategory == 'Background' ? <DalleResult selectedOption = {selectedCategory} onImageSelect={handleSelectedBackground}/> : <GIPHY  onSelectedStickersChange={handleSelectedStickersChange}/>}
        {console.log(`this is the parent component storybuilder ${selectedBackground}`)}
        {/* {selectedStickers.map(stickerurl=><img src={stickerurl}/>)}
        <img src={selectedBackground}/> */}
        {/* // this is where i will pass the background and the stickers array separately */}
        {/* {updatedStickers = [...selectedStickers, selectedBackground]} */}
        <Konva propArray = { selectedStickers } selectedImage={selectedBackground}/>
        </div>
    </div>
    </>
)
}