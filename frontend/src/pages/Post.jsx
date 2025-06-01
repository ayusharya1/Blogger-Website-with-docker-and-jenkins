
import React, { useEffect, useState } from 'react'
import { baseUrl, get, post } from '../services/EndPoint';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function Post() {
  const { id } = useParams()
  // console.log(id);
  const [postdata, setPostdata] = useState()
  const navigate=useNavigate()
  const singlepost = async () => {
    try {
      const response = await get(`/public/singlepost/${id}`)
      const data = response.data.post

      setPostdata(data)

    } catch (error) {
      console.log(error);

    }
  }
  const postId=id
 const user=useSelector((state)=>state.auth)
 const [value,setValue]=useState({
    postId:postId,
    userId:user.user._id,
    comment:""
  })
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault()
    const response=await post(`/comment/addcomment`,value)
    const data=response.data
    if(data.success===true){
      toast.success(data.message)
      navigate(`/`)
    }
    } catch (error) {
     console.log(error);
    }
  }
  const handleChange=(event)=>{
    setValue({...value,[event.target.name]:event.target.value})
  }
  useEffect(() => {
    singlepost()
  }, [])
  // console.log(value);
  
  return (
    <>
      {postdata && (
        <div className='container text-white mt-5 mb-5'>
          <div className='flex flex-wrap mx-5'>
            <div className="w-full">
              <h1 className='font-bold text-5xl text-white mb-4'>{postdata.title}</h1>
              <img src={`${baseUrl}/images/${postdata.postimage}`} className='w-full h-auto mb-4' style={{
                borderRadius: "10px", maxHeight: "700px", objectFit: "cover", width: "80%"
              }} alt="" />
              <p className='mb-5'>{postdata.description}</p>
              <hr />
              <h3 className='mt-5 mb-4 text-4xl font-semibold'>
                Leave a comment
              </h3>
              <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor="comment" className='block text-md font-medium text-gray-700 mb-2'>Comment</label>
                  <textarea value={value.comment} name='comment' onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500" id="comment" rows="4" placeholder='Write your comment here '></textarea>
                </div>
                <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3'>Submit comment</button>
              </form>
              <hr />
              <h3 className="mt-5 mb-4 ">Comments</h3>
             {postdata.comments.map((cmnt,index)=>(
               <div className="bg-gray-500 p-3 rounded mb-3 flex items-center text-black">
                <img
                  src={`${baseUrl}/images/${cmnt.userId.profile}`}
                  alt="John Doe"
                  className="rounded-full mr-3 w-[50px] h-[50px] object-cover"
                />
                <div>
                  <h5 className="mb-1 text-lg font-semibold">{cmnt.userId.FullName}</h5>
                  <p className="mb-0 text-gray-700">{cmnt.comment}</p>
                </div>
              </div>
             ))}
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Post