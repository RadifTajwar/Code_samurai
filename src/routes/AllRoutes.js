import React from 'react'
import { Route, Routes } from "react-router-dom"
import HomePage from '../pages/HomePage/HomePage'
import LogInPage from '../pages/LoginPage/LogInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<HomePage/>}/> 
            <Route path='/login' element={<LogInPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
        </Routes>
    </>
  )
}

export default AllRoutes
