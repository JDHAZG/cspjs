import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
// import { Navigate } from "react-router";
import Login from '../pages/login/Login'
import Cspjs from '../pages/sandbox/Cspjs'
export default function IndexRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/*" element={localStorage.getItem("token")?<Cspjs/>:<Navigate to="/login" replace={true}/>}/>
    </Routes>
  )
}
