import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'

import './App.css'
function App() {
  return (
   <div >
     <Router >
      <Routes>
        
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login />} />
       </Routes>
    </Router>
   </div>
  )
}

export default App
