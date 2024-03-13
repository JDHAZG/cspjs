import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from '../pages/login/Login'
import Cspjs from '../pages/sandbox/Cspjs'
export default function IndexRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/*" element={<Cspjs/>}/>
    </Routes>
  )
}
