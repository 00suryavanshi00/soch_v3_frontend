import React, { useState } from 'react';
import './DropDownMenu.css'

const DropDownMenu = ({selectedOption, onChange}) => {
  // const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    // setSelectedOption(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <div>
      <h2>Let's Make a New Story</h2>
      <div className='bg-ccl'></div>
      <p>Use your imagination to unleashing the most creative and unique Story line with the use of tools below. Select your background and Characters, place them on the Canvas ready to start your play.
      Convert Your Imagination to Vision.</p>

      <iframe className='flyy' src="https://giphy.com/embed/gA3sHT8mM02U82gA9h"  frameBorder="0" ></iframe>
      <p>
      <a href="https://giphy.com/gifs/kawaii-balloon-pupumaru-gA3sHT8mM02U82gA9h">
      </a>
      </p>

      <div className='bg-cl'></div>

      </div>
      


      <label className='sao'>Select an option</label>
      <select className='select' value={selectedOption} onChange={handleOptionChange}>
        <option value="Background" defaultChecked = 'true'>Background</option>
        <option value="Characters/ Objects">Characters/ Objects</option>
      </select>
      <br/>
      {/* <p>Selected option: {selectedOption}</p> */}
    </div>
    
  );
};

export default DropDownMenu;


