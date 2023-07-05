import React from "react";
import './Card.css'
import { Link } from "react-router-dom";
import trialcard from "./trialcard";

function Card(props) {
   
  return (
    
        <div className="card-container ">
            <div class="row">
                <img  className="image-container" src={props.img} alt="photo" />
                <div className="card-title">
                {/* <h2 className="heading">{props.name}</h2> */}
                <p className="text">{props.name}</p>
                {/* <Link className="txt" to="">{props.link}</Link> */}
                <a className='play-but' href={props.link}>Start  >></a>
            </div>
            </div>
            
        
        </div>

 
     
  )

    
}



export default Card;