import React,{useState} from "react"
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import {Link} from "react-router-dom"
import "./Login.css"

export const Login = (props) => {
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
       


    }


    return (
        <div className="flex-container">
            <div className='bg'></div>
            
            <div className="auth-form">
            

            <form className="reg-form"  onSubmit={handleSubmit} >
                
            
                <h1 className="title ">Login</h1>
                <h3 className="tagline">Where Imagination turns to Animation</h3>

                <label htmlfor="email">email</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>


                <label htmlfor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="Password" id="password" name="password"/>

                <label>
                    <input className="checkbx" type="checkbox"  />
                       Remember Me
                </label>

                <Link className="link-but" to="/">Login</Link>

                

            </form>

            <div>
            <br></br>
                <Link className="login-link" to="/reg" >Not a Member? Register</Link>

            </div>

            
            
            
        </div>

    </div>
        
        
        
    )

}

export default Login;

