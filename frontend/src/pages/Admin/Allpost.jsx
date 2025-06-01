import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { del, get,baseUrl } from '../../services/EndPoint'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
function Allpost() {
  const [posts,setPost]=useState([])
  const navigate=useNavigate()
  const getPost=async()=>{
    try {
      const response= await get("/blog/GetPosts")
      const data=response.data
      // console.log(data);
      setPost(data)

    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getPost()
  },[])
  // console.log(posts);
   const handleDelete=async(id)=>{
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if(confirmed){
    try {
      const response=await del(`/blog/delete/${id}`)
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
  const handleUpdate=(id)=>{
    navigate(`/update/${id}`);
  }
  return (
    <div className="container">
  <h1 className="text-center mb-8 text-white text-3xl font-semibold">All Posts</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {posts && posts.map((item,index)=>(
      <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-md flex flex-col h-full">
        <img
          src={`${baseUrl}/images/${item.postimage}`}
          alt=""
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex-grow">
          <h5 className="text-xl font-semibold mb-2 text-white">{item.title}</h5>
          <p className="text-gray-300">{item.description}</p>
        </div>
        <div className="flex justify-between p-4 bg-gray-900">
          <button
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
            onClick={()=>handleDelete(item._id)}
          >
            <FaTrashAlt /> Delete
          </button>
          <button
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-md transition"
            onClick={()=>handleUpdate(item._id)}
          >
            <FaEdit /> Update
          </button>
        </div>
      </div>
      
    ))}
  </div>
</div>

  )
}

export default Allpost