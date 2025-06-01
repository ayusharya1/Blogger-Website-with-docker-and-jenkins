import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { del, get } from '../../services/EndPoint'
import toast from 'react-hot-toast'

function User() {
  const [users,setUsers]=useState([])
  const getUser=async()=>{
    try {
      const response=await get("/dashboard/users")
    const data=response.data.Users
    // console.log(data);
    setUsers(data)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getUser()
  },[])
  const handleDelete=async(id)=>{
    
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if(confirmed){
    try {
      const response=await del(`/dashboard/deleteuser/${id}`)
      const data=response.data
      if(data.success===true){
        toast.success(data.message)
      }
      else {
          toast.error('Failed to delete the user.');
        }
    } catch (error) {
      console.log(error);
      
    }}
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4">
  <h1 className="text-white text-3xl font-semibold mb-6">Users</h1>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-700 bg-gray-900 rounded-md">
      <thead>
        <tr className="text-left text-gray-300">
          <th className="px-6 py-3">#</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Email</th>
          <th className="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700 text-gray-200">
         {users?.map((item,index)=>(
           <tr key={index} className="hover:bg-gray-800">
            <th className="px-6 py-4 font-medium">{index + 1}</th>
            <td className="px-6 py-4">{item.FullName}</td>
            <td className="px-6 py-4">{item.email}</td>
            <td className="px-6 py-4">
              <button
              onClick={()=>handleDelete(item._id)}
                className="inline-flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
              >
                <FaTrashAlt className="mr-2" /> Delete
              </button>
            </td>
          </tr>
         ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default User