import React from 'react'
import {useState} from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
// import { Navigate } from "react-router";
import Login from '../pages/login/Login'
import Cspjs from '../pages/sandbox/Cspjs'
import Register from '../pages/register/Register'
export default function IndexRouter() {
  //for new render
  const [loginState, setLoginState] = useState(false)
  const changeLoginState = (val) => { 
    setLoginState(val)
   }
  return (
    <Routes>
      <Route path="/login" element={<Login changeLoginState={changeLoginState} loginState={loginState}/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/*" element={localStorage.getItem("token")?<Cspjs/>:<Navigate to="/login" replace={true}/>}/>
      {/* <Route path="/*" element={loginState?<Cspjs/>:<Navigate to="/login" replace={true}/>}/> */}
      {/* 此处路由在登录前就已经计算出localStorage.getItem("token")，不会再计算一次 */}
    </Routes>
  )
}
