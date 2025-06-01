import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserLayout from './Layouts/UserLayout'
import AdminLayout from './Layouts/AdminLayout'
import AddPost from './pages/Admin/AddPost'
import Allpost from './pages/Admin/Allpost'
import Dashboard from './pages/Admin/Dashboard'
import User from './pages/Admin/User'
import {Toaster} from "react-hot-toast"//to show alert (npm i react-hot-toast)
import UpdateBlog from './Components/UpdateBlog'
function App() {
  return (
     <>
     <BrowserRouter>
     <Toaster/>
     <Routes>
      <Route path='/' element={<UserLayout></UserLayout>}>
      <Route index element={<Home/>}/>
      <Route path='post/:id' element={<Post/>}/>
      <Route path='profile/:id' element={<Profile/>}/>
      <Route path='/update/:id' element={<UpdateBlog/>}></Route>
      </Route>
      <Route path='/dashboard' element={<AdminLayout></AdminLayout>}>
      {/* yh below routes acces karne k liye phele dashboard route likhna padega */}
      <Route index element={<Dashboard/>}></Route>
      <Route path='addpost' element={<AddPost/>}></Route>
      <Route path='users' element={<User/>}></Route>
      <Route path='allposts' element={<Allpost/>}></Route>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      
     </Routes>
     </BrowserRouter>
     </>
  )
}

export default App