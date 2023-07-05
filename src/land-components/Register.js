import React,{useState, useEffect} from "react"
import {Link} from "react-router-dom"
// import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import './Register.css';


export const Register = (props) => {
    const [name,setName] = useState('');
    const [contact,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        console.log(name);
        console.log(contact);
        console.log(email);
        console.log(pass);
       
    }

    const initialValues = {name:"",contact:"",email: "",pass:""}
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const PHONE_REGEX = 
               new RegExp(/"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/gmi);
    const handleChange = (e) => {
        const {name,value}= e.target;
        setFormValues({...formValues,[name]:value})
        return PHONE_REGEX.test(contact);
    }

    useEffect(() => {
        console.log(formErrors)
        if(Object.keys(formErrors).length == 0 && isSubmit){
            console.log(formValues)
        }

    },[formErrors])
    const validate = (values) => {
        const errors = {};
        const regex =  /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        
        // const regexx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

        if (!values.name){
            errors.name = "Your Name is Important, dont you think?"
        }
        if (!values.contact){
            errors.contact = "Enter your phone number"
        }
    
        if (!values.email){
            errors.email = "You should be having an email? "
        }
        if (!values.pass){
            errors.pass = "You dont want to keep a password?"
        }

        return errors;


    }

    return (
        <div className="flex-container">
            <div className='bg'></div>
            
            <div className="auth-form">
            

            <form className="reg-form"  onSubmit={handleSubmit} >
                
            
                <h1 className="title ">Welcome to Soch</h1>
                <h3 className="tagline">Please Register to turn your Imagination to Animation</h3>

            
                <label htmlfor="Name">Name</label>
                <input value={formValues.name} onChange={(e) => setName(e.target.value)}type="Name" placeholder="Enter your Name " id="name" name="name" onChange={handleChange} />
                <p className="errormsg" >{formErrors.name}</p>



                <label htmlfor="contact">Contact</label>
                <input value={formValues.contact} onChange={(e) => setPhone(e.target.value)}type="contact" placeholder="Contact" id="contact" name="contact" onChange={handleChange} />
                <p className="errormsg">{formErrors.contact}</p>
                



                <label htmlfor="email">email</label>
                <input value = {formValues.email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" onChange={handleChange} />
                <p className="errormsg">{formErrors.email}</p>




                <label htmlfor="password">password</label>
                <input onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password" onChange={handleChange} />
                {/* <p className="errormsg">{formErrors.pass}</p> */}


               

                <button type="submit" className="link-but">Register</button>
                

            </form>

            <div>
            <br></br>
                <Link className="login-link" to="/login" >Already Registered? Login</Link>

            </div>

            
            
            
        </div>

    </div>
        
        
        
    )

}

export default Register;