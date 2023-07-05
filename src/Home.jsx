import Card from './components/Card';
import Greeting from './components/Greeting';
import Navbar from './components/Navbar';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Card } from "react-bootstrap";
import trialcard from './components/trialcard';
import {Link} from "react-router-dom"
import './Home.css'
import React, { useEffect, useState } from 'react'

function createCard (trialcard){
  return (
    <Card
      key ={trialcard.id}
      name = {trialcard.name}
      img = {trialcard.img}
      description = {trialcard.description}
      link = {trialcard.link}
      />
     )
  }


function Home(props) {
  
  const[storyArray, setStoryArray] = useState({});
  const[isLoading, setIsLoading] = useState(true);
  const[error, setError] = useState(null);
  
  useEffect( () => {
      axios.get('http://localhost:4001/soch/v1/stories')
        .then((res) => {
          setStoryArray(res.data);
          setIsLoading(false)
        })
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
  },[]);

  

  return (
  <>
  
    <div className="Home">
      <Navbar />
      <Greeting/>
      <div className='e-card-horizontal'>

        {/* {
          // stories? stories.map((story)=>{
          //   return (
          //     <Card story = {story}/>
          //   )
          // }):null
          isLoading? (<div>Loading.... </div>):
          error ? (<div> {error.message}</div>) : !storyArray ? <div> Array is empty</div> :
          storyArray.stories.map((story) => {
           return 
           <Card story = {story}/>
          })
        } */}


        {trialcard.map(createCard)}
        
        {/* <Card
          storyname={props.name} 
          description={props.description}
        />
        <Card
          storyname={props.name} 
          description={props.description}
        />
        <Card
          storyname={props.name} 
          description={props.description}
        />
        <Card
          storyname={props.name} 
          description={props.description}
        />
         */}
      </div> 
      <Link className="stor-but" to="/tys" >Try Yourself</Link>
    
    </div>
  </>
  );
}

export default Home;
