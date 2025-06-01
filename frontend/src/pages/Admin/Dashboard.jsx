import React, { useEffect, useState } from 'react'
import { get } from '../../services/EndPoint';

function Dashboard() {
  const [post,setPost]=useState([])
  const [user,setUser]=useState([])
  const [comment,setComment]=useState([])
  const getData=async()=>{
    try {
      const response=await get("/dashboard")
      const data=response.data
      // console.log(data);
      setPost(data.Posts)
      setUser(data.Users)
      setComment(data.Comments)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
getData()
  },[])
  console.log("users",user);
  console.log("post",post);
  
  // let postlen=0;
  // const getPost=()=>{
  //   post.forEach((perpost)=>{
  //     postlen+=perpost.comments.length
  //     console.log(postlen);
      
  //   })
  // }
  // getPost()
  // useEffect(()=>{
  //   getPost()
  // },[post])
  // console.log(postlen);
  
  return (
    <>
    <div>
  <h2 className="mb-4 text-white text-2xl font-semibold">Dashboard</h2>
  <div className="flex flex-wrap -mx-2">
    <div className="w-full md:w-1/3 px-2 mb-4">
      <div className="bg-blue-600 text-white rounded shadow p-4 h-full">
        <h5 className="text-lg font-semibold mb-2">Total Users</h5>
        <p className="text-2xl">{user && user.length}</p>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-2 mb-4">
      <div className="bg-green-600 text-white rounded shadow p-4 h-full">
        <h5 className="text-lg font-semibold mb-2">Total Posts</h5>
        <p className="text-2xl">{post && post.length}</p>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-2 mb-4">
      <div className="bg-yellow-500 text-white rounded shadow p-4 h-full">
        <h5 className="text-lg font-semibold mb-2">Total Comments</h5>
        <p className="text-2xl">{comment && comment.length}</p>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Dashboard