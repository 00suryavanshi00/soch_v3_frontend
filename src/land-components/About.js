import React from 'react'
import './About.css'
import { Container } from 'react-bootstrap'
import Navbar from '../components/Navbar'


function About() {
  return (
    <div>

        <Navbar/>

        <h1 className='aiish--head'>About Us</h1>
        <br/>
        <h3 className='aiish_head'>AIISH : All India Institue of Speech and Hearing</h3>
        <p className='loc'>Mysore,India</p>

        
        
        <p>
        AIISH also conducts research in speech-language pathology, audiology, speech sciences, and hearing sciences. Some of the current research activities focus on early identification and genetics of hearing impairment, effectiveness of intervention strategies, development of assessment materials for Indian languages, and speech speaker recognition. It has developed normative data for speech and language acquisition in children for various Indian languages and established a research fund from which small grants are awarded to specialists working in fields such as neurology, genetics, epidemiology, linguistics, otolaryngology, clinical psychology and pediatrics. It also publishes a yearly scholarly journal</p>
        <div className='aiish-1'></div>


        <div className='row'>
            <Container className='cont'>
                <div className='aiish-bg'></div>
                
            </Container>

            <div>
                <h1 className='column'>Developers of     SOCH</h1>
                <p className='p-us'> Students of Vidya Vardhaka College of Engineering. <br/><br/>
                We, Final Year BTech Students with the moto of helping the Children who can Dream but cant Describe came up with SOCH
                <br/> <br/>
                The main Goal of SOCH is to convert <h3 className='moto'>Imagination to Animation</h3>

                </p>
            </div>
        </div>

        <div>
        <h1 className='guides' >Our Guides Through the Journey</h1>

        <div className='row'>
            <div className='column-2'>
                <div className='dp-1'></div>
                <h2 className='names'>Dr. Reuben Thomas Varghese</h2>
                <h4>Scientist,AIISH (Mysore)</h4>
            </div>
            <div className='column-2'>
                <div className='dp-2'></div>
                <h2 className='names-2'>Dr.Karthik Venkat</h2>
                <h4>Professor,AIISH (Mysore)</h4>
            </div>
            <div className='column-2'>
                <div className='dp-3'></div>
                <h2 className='names-3'>Dr. Ravi Kumar</h2>
                <h4 className='ravi'>Assistant Professor, VVCE(Mysore)</h4>
            </div>
        </div>


        <div className='cnt'>
            <h1 className='cnt-head'>Contact US</h1>
            <Container className='cnt-box'>

        <div className='row'>
            <div className='column-2'>
                <div className='dp-s1'></div>
                <h2 className='names-us'>Sanskar Suryavanshi</h2>
                <h5>
                Intern at <br/> HashedIn by Deloitte(Bangalore) 
                <br/><br/>
                email : ssuryavanshi0001@gmail.com
                
                </h5>
            </div>
            <div className='column-2'>
                <div className='dp-s2'></div>
                <h2 className='names-us'>Shambhavi Mallikarjuna</h2>
                <h5>Intern at IIIT (Hyderabad) 
                <br/><br/>
                email : shambhzy13@gmail.com
                
                </h5>
            </div>
            <div className='column-2'>
                <div className='dp-v3'></div>
                <h2 className='names-us'>Vibha G Mugwe</h2>
                <h5>Student in VVCE (Mysore)
                <br/><br/>
                email : vibhamugwe@gmail.com
              
                </h5>
            </div>
            <div className='column-2'>
                <div className='dp-s4'></div>
                <h2 className='names-us'>Sanket S Nargund</h2>
                <h5>Student in VVCE(Mysore)
                <br/><br/>
                email : sankets@gmail.com
                
                </h5>
            </div>
        </div>
            </Container>
            
        </div>
            
        </div>


    </div>
    
  )
}

export default About