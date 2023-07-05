import React, { useState } from 'react'
import './Dalle.css'
import InputBox from './InputBox'
import { Configuration,OpenAIApi } from "openai";
import Navbar from './Navbar';



function Dalle () {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")

  //trying to store all the images in the array
  const [resultArray, setResultArray] = useState([])

  const configuration = new Configuration({
    // apiKey: process.env.REACT_APP_API_KEY,
    apiKey: "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"
    // organization: "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"
  })

  const openai = new OpenAIApi(configuration);
  
  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 4,
      size : "512x512"
    })
    setResult(res.data.data[0].url)
    for (let i = 0 ; i<res.data.length ; i++){
        resultArray.push(res.data.data[i].url);
    }

  }

  return (
    <div>
     
      <h2 className='generate'>Generate AI images please</h2>
      
     
      <textarea className='inp' placeholder='lets generate AI'
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button className='btt' onClick={generateImage}>Generate an Image</button>

      <hr/>

      {result.length > 0 ? (
        <img src={result} alt={result} />
      ): (
        <p className='generate'>No Data!</p>

      )}
      

    </div>
  )
}

export default Dalle




// import { useState } from "react";
// import { Configuration, OpenAIApi } from "openai";
// import { InputBox } from "./InputBox";

// const configuration = new Configuration({
//   apiKey: process.env.REACT_APP_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// function Dalle() {
//   const [userPrompt, setUserPrompt] = useState("");
//   const [number, setNumber] = useState(1);
//   const [size, setSize] = useState("256x256");
//   const [imageUrl, setImageUrl] = useState("");

//   const generateImage = async () => {
//     const imageParameters = {
//       prompt: userPrompt,
//       n: parseInt(number),
//       size: size,
//     };
//     const response = await openai.createImage(imageParameters);
//     const urlData = response.data.data[0].url;
//     setImageUrl(urlData);
//   };

//   return (
//     <main className="App">
//       <h1>Describe your SOCH!</h1>
//       <br />
//       <img src="/soch_transparentbg 1.png" alt="" />
//       {imageUrl && <img src={imageUrl} className="image" alt="ai thing" />}
//       <InputBox label={"Description"} setAttribute={setUserPrompt} />
//       <InputBox label={"Amount"} setAttribute={setNumber} />
//       {/* <InputBox label={"Size"} setAttribute={setSize} /> */}
//       <button className="main-button" onClick={() => generateImage()}>
//         Generate
//       </button>
//     </main>
//   );
// }

// export default Dalle;