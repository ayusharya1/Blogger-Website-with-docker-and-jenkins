import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../services/EndPoint'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { SetUser } from '../redux/AuthSlice'

function Login() {
  const [value,setValue]=useState({
    email:"",
    password:""
  })
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleChange=(event)=>{
// console.log(event.target.value);
setValue({...value,[event.target.name]:event.target.value})

  }
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault()
      // console.log(value);
      const response=await post("/auth/login",value)
      const data=response.data
      console.log(data);
      if(data.success===true){
        toast.success(data.message)
        navigate("/")
        dispatch(SetUser(data.user))
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong Credentials")
    }
  }
  // console.log(value);
  
  return (
    <>
    <section className="bg-gray-100 min-h-screen flex items-center justify-center py-4">
  <div className="w-full max-w-sm mx-auto flex flex-col items-center">
    <Link to="/" className="mb-6 text-gray-800 flex items-center space-x-2">
      <img
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
        alt="logo"
        width="32"
        height="32"
      />
      <span className="text-xl font-bold">Blogger</span>
    </Link>

    <div className="w-full bg-white shadow-md rounded-lg">
      <div className="p-6">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit}  className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={value.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
            value={value.password}
            onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            {/* Optional links or checkboxes can go here */}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account yet?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Login