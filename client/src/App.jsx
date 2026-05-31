import React, { useContext, useEffect } from 'react'
import {Navigate, Route,Routes, useNavigate} from 'react-router-dom'
import Login from './pages/Login'
import ProfileUpdate from './pages/ProfileUpdate'

import HomePage from './pages/HomePage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'


function App() {


const {authUser} = useContext(AuthContext)
  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/"/>}/>
        <Route path='/profileUpdate' element={authUser ? <ProfileUpdate/> : <Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App
