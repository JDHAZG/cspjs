import React from 'react'
import SideMenu from '../../components/SideMenu'
import TopHeader from '../../components/TopHeader'
import { Navigate, Route, Routes } from 'react-router-dom'
import ExamInfo from './student/ExamInfo'
import TeacherInfo from './teacher/TeacherInfo'
import StudentInfo from './student/StudentInfo'
import ExamManage from './teacher/ExamManage'
import StudentMange from './teacher/StudentMange'
// import NotAccess from './notaccess/NotAccess'
export default function Cspjs() {
  return (
    <div>
      <SideMenu />
      <TopHeader />
      <Routes>
        <Route path="/student/personal-info" element={<StudentInfo/>}/>
        <Route path="/student/exam-info" element={<ExamInfo/>}/>
        <Route path="/teacher/personal-info" element={<TeacherInfo/>}/>
        <Route path="/teacher/student-manage" element={<StudentMange/>}/>
        <Route path="/teacher/exam-manage" element={<ExamManage/>}/>
        <Route path="/" element={<Navigate to="/home"/>}/>
        {/* <Route path="*" element={<NotAccess/>}/> */}
      </Routes>
      Cspjs
    </div>
  )
}
