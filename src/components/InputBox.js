import React, { useState } from 'react'
import './Dalle.css'
import './DalleResule.css'
import './InputBox.css'

export const InputBox =({label, setAttribute}) => {
  return (
    <div className='label-input-pair' >
        <label className='label'>{label}</label>
        <input className='main-input' placeholder="What's on your mind 🤔" onChange={(e)=>setAttribute(e.target.value)} />
        
    </div>
  );
}

export default InputBox