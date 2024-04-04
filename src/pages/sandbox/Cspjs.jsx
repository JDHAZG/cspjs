import React, { useEffect, useState } from 'react'
import axios from "axios"
import SideMenu from '../../components/SideMenu'
import TopHeader from '../../components/TopHeader'
import { Navigate, Route, Routes } from 'react-router-dom'
import ExamInfo from './student/ExamInfo'
import TeacherInfo from './teacher/TeacherInfo'
import StudentInfo from './student/StudentInfo'
import ExamManage from './teacher/ExamManage'
import StudentMange from './teacher/StudentMange'
import "./Cspjs.css";
import {Layout} from 'antd';
import Home from './home/Home'
import NotAccess from './notaccess/NotAccess'
// import NotAccess from './notaccess/NotAccess'
const {Content}=Layout
const LocalRouterMap={
  "/student/personal-info":<StudentInfo/>,
  "/student/exam-info":<ExamInfo/>,
  "/teacher/personal-info":<TeacherInfo/>,
  "/teacher/student-manage":<StudentMange/>,
  "/teacher/exam-manage":<ExamManage/>,
  "/home":<Home/>,
}
export default function Cspjs() {
  const [BackRouteList,setBackRouteList]=useState([]);
  useEffect(() => { 
      axios.get("/rights").then((res) => { 
      // console.log(res);
      setBackRouteList([...res.data])
     })
   },[])
   const {role:{rights}}=JSON.parse(localStorage.getItem("token"))?JSON.parse(localStorage.getItem("token")):{role:{rights:[]}};
   const checkRoute = (item) => {
     return LocalRouterMap[item.key]&&(item.pagepermisson);
   }
   const checkUserPerMission = (item) => {
     return rights.includes(item.key);
   }
  return (
    <Layout> 
      <SideMenu />
      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "87.5vh",
            overflow: "auto",
          }}
        >
        <Routes>
          {
            BackRouteList.map((item) => {
              if(checkRoute(item)&&checkUserPerMission(item))
              return <Route path={item.key} key={item.key} element={LocalRouterMap[item.key]} exact/>
              return null;
            })
          }
          <Route path="/" element={<Navigate to="/home"/>}/>
          {BackRouteList.length>0 && <Route path="*" element={<NotAccess/>}/>}
        </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}
