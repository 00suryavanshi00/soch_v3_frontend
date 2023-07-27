import React, { useState } from 'react';

const DropDownMenu = ({selectedOption, onChange}) => {
  // const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    // setSelectedOption(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <label>Select an option</label>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="Background" defaultChecked = 'true'>Background</option>
        <option value="Characters/ Objects">Characters/ Objects</option>
      </select>
      {/* <p>Selected option: {selectedOption}</p> */}
    </div>
  );
};

export default DropDownMenu;
