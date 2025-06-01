import React, { useEffect, useState } from 'react'
import { FaCamera, FaLock, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl, patch } from '../services/EndPoint';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SetUser } from '../redux/AuthSlice';

function Profile() {
  const user=useSelector((state)=>state.auth).user
  console.log(user);
  const {id}=useParams()
  const [profile,setProfile]=useState(null)
  const [name,setName]=useState("")
  const [oldpass,setOldPass]=useState("")
  const [newpass,setNewPass]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault()
    const formData=new FormData()
    if(profile){
      formData.append("profile",profile)
    }
    if(name){
      formData.append("FullName",name)
    }
    if(oldpass && newpass){
      formData.append("oldpassword",oldpass)
      formData.append("newpassword",newpass)
    }
    else if((!oldpass && newpass)|| (!newpass && oldpass)){
      toast.error("old password and new password both are necessary");
    }
    const response=await patch(`/public/updateuser/${id}`,formData)
     const data = response.data
     console.log(data);
     
      if(data.success==true){
        navigate("/")
        toast.success(data.message)
        dispatch(SetUser(data.updatedUser))
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white mt-10">
  <h1 className="text-3xl font-semibold text-center mb-6">Update Profile</h1>
  <form className="space-y-5" onSubmit={handleSubmit}>
    <div className="relative w-52 h-52 mx-auto mb-4">
      <label htmlFor="profileImage" className="block relative cursor-pointer">
        <img
            src={`${baseUrl}/images/${user.profile}`}
            alt="Avatar"
            className="w-52 h-52 rounded-full object-cover border-4 border-white"
          />
        <FaCamera className="absolute bottom-4 right-3 bg-gray-700 p-2 text-white rounded-full w-8 h-8" />
      </label>
      <input
        type="file"
        id="profileImage"
        accept="image/*"
        onChange={(e)=>setProfile(e.target.files[0])}
        className="hidden"
        name='profile'
      />
    </div>

    <div className="relative">
      <FaUser className="absolute top-3 left-3 text-gray-400" />
      <input
        type="text"
        placeholder="Update Name"
        onChange={(e)=>setName(e.target.value)}
        name='"FullName'
        className="w-full py-2 pl-10 pr-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="relative">
      <FaLock className="absolute top-3 left-3 text-gray-400" />
      <input
        type="password"
        placeholder="Old Password"
        onChange={(e)=>setOldPass(e.target.value)}
        className="w-full py-2 pl-10 pr-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="relative">
      <FaLock className="absolute top-3 left-3 text-gray-400" />
      <input
        type="password"
        placeholder="New Password"
        onChange={(e)=>setNewPass(e.target.value)}
        className="w-full py-2 pl-10 pr-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded font-semibold text-white"
    >
      Update Profile
    </button>
  </form>
</div>

  )
}

export default Profile