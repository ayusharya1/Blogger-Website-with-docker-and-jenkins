import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SetUser } from '../redux/AuthSlice'
import toast from 'react-hot-toast'
import { post } from '../services/EndPoint'

function Register() {
   const [FullName, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [profile,setprofile]=useState("https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180")
    const [password,setPassword]=useState("")
  const dispatch=useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
      try {
        e.preventDefault()
        const formData=new FormData()        
        formData.append("profile",profile)
          formData.append('FullName', FullName);
        formData.append('email',email);
        formData.append('password',password);
         formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
        const response = await post("/auth/register", formData)
        const data = response.data
  
        if(data.success==true){
          navigate("/")
          toast.success(data.message)
          dispatch(SetUser(data.user))
        }
        
        console.log(data);
  
      } catch (error) {
        console.log(error);
  
      }
    }
    // console.log(profile);
    
  return (
    <section className="bg-gray-100">
  <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-4">
    <a href="#" className="mb-4 text-gray-800 no-underline flex items-center">
      <img
        className="mr-2"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
        alt="logo"
        width="32"
        height="32"
      />
      <Link to="/">
        <span className="text-xl font-bold">Blogger</span>
      </Link>
    </a>

    <div className="bg-white shadow-sm w-full max-w-md rounded-lg">
      <div className="p-6">
        <h1 className="text-lg font-bold text-gray-800 mb-4">Create an account</h1>

        <form onSubmit={handleSubmit}  encType="multipart/form-data" method='post'>
          <div className="text-center mb-4" >
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture {profile!=="https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180"?"(Image Selected)":""}
            </label>
            <div className="flex justify-center">
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180"
                alt="avatar"
                className="rounded-full w-24 h-24 object-cover cursor-pointer"
  
              />
            </div>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e)=>setprofile(e.target.files[0])}
              className="bg-zinc-300 rounded-full w-24 h-24 absolute top-[28.2%] right-[47%] flex items-center justify-center opacity-[.05]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="John Doe"
              required
              onChange={(e)=>setFullname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              required
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>
</section>

  )
}

export default Register