import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaPlusSquare, FaUsers, FaFileAlt } from 'react-icons/fa'
function Sidebar() {
  return (
<div className="bg-gray-900 text-white h-screen" style={{ width: '250px' }}>
  <div className="p-3">
    <ul className="flex flex-col text-xl gap-5">
      <li className="mb-3">
        <Link className="flex items-center text-white hover:text-gray-300" to="/dashboard">
          <FaHome className="mr-2" /> Dashboard
        </Link>
      </li>
      <li className="mb-3">
        <Link className="flex items-center text-white hover:text-gray-300" to="/dashboard/addpost">
          <FaPlusSquare className="mr-2" /> Add Post
        </Link>
      </li>
      <li className="mb-3">
        <Link className="flex items-center text-white hover:text-gray-300" to="/dashboard/users">
          <FaUsers className="mr-2" /> All Users
        </Link>
      </li>
      <li className="mb-3">
        <Link className="flex items-center text-white hover:text-gray-300" to="/dashboard/allposts">
          <FaFileAlt className="mr-2" /> All Posts
        </Link>
      </li>
      {/* 
      <li className="mb-3">
        <a className="flex items-center text-white hover:text-gray-300" href="#">
          <FaComments className="mr-2" /> All Comments
        </a>
      </li>
      */}
    </ul>
  </div>
</div>

  )
}

export default Sidebar