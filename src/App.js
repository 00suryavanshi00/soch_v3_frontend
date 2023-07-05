import React,{useState} from 'react';
import Card from './components/Card';
import Greeting from './components/Greeting';
import Navbar from './components/Navbar';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Card } from "react-bootstrap";
import trialcard from './components/trialcard';
import Home from './Home';
import Land from './Land';
import Login from './land-components/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './land-components/Register';
import Try from './components/Try';
import About from './land-components/About';
import Dalle from './components/Dalle';
// import Konva from 'konva';
import Konva from './components/Konva';
import TryA from './components/TryA';
import TurtnRab from './components/TurtnRab';
import CleverRab from './components/CleverRab';
import TalkativeTur from './components/TalkativeTur';
import BearMen from './components/BearMen';
import TYourself from './components/TYourself';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path ="/land" element={<Land/>}/>
          <Route path ="/login" element={<Login/>}/>
          <Route path ="/reg" element={<Register/>}/>
          <Route path="/tys" element={<TYourself/>}/>
          <Route path="/abt" element={<About/>}/>
          <Route path="/try" element={<Try/>}/>
          <Route path="/kon1" element={<Konva/>}/>
          <Route path="/kon2" element={<TurtnRab/>}/>
          <Route path="/kon3" element={<CleverRab/>}/>
          <Route path="/kon4" element={<TryA/>}/>
          <Route path="/kon5" element={<TalkativeTur/>}/>
          <Route path="/kon6" element={<BearMen/>}/>
          
        </Routes>
      </Router>
      
     
    
    </div>
  );
}

export default App;
