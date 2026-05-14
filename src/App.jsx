import React, { useContext, useEffect } from 'react'
import {Route,Routes, useNavigate} from 'react-router-dom'
import Login from './pages/Login'
// import Chat from './pages/Chat'
import ProfileUpdate from './pages/ProfileUpdate'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from './config/firebase'
import { AppContext } from './context/appContext'
import HomePage from './pages/HomePage'


function App() {

  // const navigate = useNavigate();
  // const {loadUserData} = useContext(AppContext);
  // useEffect(()=>{
  //   onAuthStateChanged(auth,async (user)=>{
  //     if(user){
  //       navigate('/chat');
  //       console.log(user);
  //       await loadUserData(user.uid)
  //     }
  //     else{
  //       navigate('/');
  //     }
  //   })
  // },[])


  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
    
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/Chat' element={<Chat/>}/> */}
        <Route path='/Profile' element={<ProfileUpdate/>}/>
      </Routes>
    </div>
  )
}

export default App
