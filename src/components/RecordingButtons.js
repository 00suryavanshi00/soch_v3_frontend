import React from 'react'
import './RecBut.css'
import { ReactMediaRecorder } from 'react-media-recorder'

function RecBut() {
  return (
    <div >
    <ReactMediaRecorder

        screen 

        render={({ status,startRecording,stopRecording,mediaBlobUrl }) => (
            <div>
                {/* <p>{status}</p> */}
                <button className='rec-but' onClick={startRecording}>Start Recording</button>
                <button className='rec-but' onClick={stopRecording}>Stop Recording</button>
                <video className='vid' src={mediaBlobUrl} autoplay loop controls></video>
            </div>
        )}
    />


    
    

    </div>
    
  )
}

export default RecBut