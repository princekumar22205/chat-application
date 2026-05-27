import React from 'react'
import {useState} from 'react'

import assets from '../assets/assets'
// import {signUp,login} from '../../config/firebase'

const Login = () => {

  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [bio,setBio] = useState("");
  const [isDataSubmitted,setIsDataSubmitted] = useState(false);


  const LoginPage = (event) =>{
    event.preventDefault();
    if(currState === "Sign Up"){
      signUp(userName,email,password);
    }
    else{
      login(email,password);
    }
  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/*----------------  left --------------------------*/}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]'/>

      {/* ---------------  right ------------------------- */}
      
        <form onSubmit={LoginPage} className='border-2 bg-white/8 text-white bordr-gray-500 p-6 flex flex-col gap-6 roujded-lg shadow-lg'>

          <h2 className='font-medium text-2xl flex justify-between items-center'>     
            {currState}
            <img src={assets.arrow_icon} alt='' className='w-5 cursor-pointer'/>
          </h2>

           {currState === "Sign Up"&& !isDataSubmitted && (<input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='Full Name'className='p-2 border border-gray-500 rounded-md focus:outline-none' required/>
          )}

          {isDataSubmitted && (
            <>
            <input type="email" placeholder='Email Address'  require className='p-2 border border-gray-599 rounded-md focus:outline-none focus:ring-2 focus:ring-ingigo-500'/>
            </>
          )}
          <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email}  placeholder='Full Name'className='p-2 border border-gray-500 rounded-md focus:outline-none' required/>

          <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='password' className='form-input' required/>

          <button className='submit'>{currState === "Sign Up"?"Creat account":"login now"}</button>

          <div className="login-term">
            <input type='checkbox'/>
            <p>Agree to the terms of use & privacy policy</p>
          </div>
        
          <div className="login-forget">
            {
              currState === "Sign Up"?
              <p className='login-toggle'>Already have an account <span onClick={()=>setCurrState("login")}>login here</span></p>
              :
              <p className='login-toggle'>creat an account <span onClick={()=>setCurrState("Sign Up")}>click here</span></p>
            }
            

            
          </div>
      </form>
    </div>
  )
}

export default Login
