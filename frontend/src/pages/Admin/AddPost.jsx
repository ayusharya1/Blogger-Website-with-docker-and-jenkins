import React, { useState } from 'react'
import { post } from '../../services/EndPoint'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function AddPost() {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [postimage,setpostimage]=useState(null)

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const formData=new FormData()
      console.log(postimage);
      
      formData.append("postimage",postimage)
        formData.append('title', title);
      formData.append('description', description);
       formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const response = await post("/blog/create", formData)
      const data = response.data

      if(data.success==true){
        navigate("/")
        toast.success(data.message)
      }
      
      console.log(data);

    } catch (error) {
      console.log(error);

    }
  }
  // console.log(value);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-center text-2xl font-semibold mb-0">Add New Post</h2>
        </div>
        <div className="p-6">
          <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-6">
              <label htmlFor="postImage" className="block mb-2 font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                id="postimage"
                name='postimage'
                onChange={(e) => setpostimage(e.target.files[0])}
                className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="postTitle" className="block mb-2 font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name='title'
                id="postTitle"
                placeholder="Enter post title"
                value={title}
                onChange={(e)=>settitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="postDescription" className="block mb-2 font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="postDescription"
                rows="6"
                placeholder="Write your post description here"
                required
                name='description'
                value={description}
                onChange={(e)=>setdescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
              >
                Submit Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default AddPost