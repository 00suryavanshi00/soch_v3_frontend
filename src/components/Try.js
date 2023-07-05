import React from 'react'
import './Try.css'
import Konva from './Konva';
import Navbar from './Navbar';
// import Card from './Card';
// import trialcard from "./tr";
// import trialcard from "./components/trialcard.js";
import Story from "./Story"

function Try() {
  return (
    <div>
      <Navbar/>
      <h1 className='heading'>
        Choose your Favourite Story
      </h1>
      <div className='bg-c'></div>
      <div className='bg-cc'></div>

      {/* Add a list of all the stories that are in demo */}
       
      <Story/>
       
      {/* <Konva/> */}
      
      
    </div>
  )
}

export default Try;