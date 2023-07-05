import React, { useState } from 'react'
import './Dalle.css'

export const InputBox =({label, setAttribute}) => {
  return (
    <div className='label-input-pair' >
        <label className='label'>{label}</label>
        <input className='main-input' onChange={(e)=>setAttribute(e.target.value)} />
    </div>
  );
}

export default InputBox