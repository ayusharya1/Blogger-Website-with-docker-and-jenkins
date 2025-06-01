import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

function UserLayout() {
  return (
    <>
    <Navbar/>
      <Outlet/>
      {/* iske andr jitne bhi child components hn usse dalsakte hn */}
    </>
  )
}

export default UserLayout