import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"
//import { Navigate } from 'react-router-dom'
//import Add from '../images/addAvatar.png'

export const Login = () => {

  const [err,setErr]=useState(false);
  const navigate=useNavigate();


  //Handlesubmitt function
  const handleSubmit=async(e)=>{
     e.preventDefault();

      console.log(e.target[0].value);
    
     const email= e.target[0].value;
     const password= e.target[1].value;
     


     //Authenticatin in firebase
     
     try {
      //sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    
     } catch (err) {
      setErr(true)
      console.log(err)
     }

    }
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className='logo'>Marcel Chat</span>
            <span className='title'>Login</span>
            <form action="" onSubmit={handleSubmit}>
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <input style={{display:"none"}} type="file" id='file' />
                
                <button>Sign in</button>

                {err && <span>something went wrong</span>}  
             </form>
            <p>do you have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}
