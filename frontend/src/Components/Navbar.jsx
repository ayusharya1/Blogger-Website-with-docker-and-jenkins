import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl, post } from '../services/EndPoint'
import toast from 'react-hot-toast'
import { RemoveUser } from '../redux/AuthSlice'

function Navbar() {
    const [isOpen,setIsopen]=useState(false)
    const [isLogin,setIsLogin]=useState(true)
   const user=useSelector((state)=>state.auth).user
   const dispatch=useDispatch()
//    console.log("user",user);
const navigate=useNavigate()   
    const dropDownRef=useRef()
    /*This block of code runs only once when your component appears on the screen (called "mount").
It's like saying: “Hey React, when the navbar shows up, do this setup.”*/
    useEffect(()=>{
        const handleClickOutside=(event)=>{
            /*const handleClickOutside = (event) => { ... }This is a function that checks:
“Did the user click outside the dropdown?”*/

            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                /*if (dropdownRef.current && !dropdownRef.current.contains(event.target))
dropdownRef.current = the actual dropdown menu on the screen.
event.target = the thing the user clicked.
contains(...) checks: is the click inside the dropdown?*/
                setIsopen(false)
            }
        }
        /*We're telling the browser:
“Hey, whenever someone clicks on the page, run handleClickOutside.”*/
        document.addEventListener("mousedown",handleClickOutside)
    },[])
    const handleDropDown=()=>{
        setIsopen(prev=>!prev)
    }
    const handleLogout=async()=>{
        try {
            const response=await post("/auth/logout")
            const data=response.data
            // console.log(data);
            toast.success(data.message)
            navigate("/")
            dispatch(RemoveUser())
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (<>
    <nav className='flex justify-between items-center p-3 bg-[#1F2936]'>
        <Link to="/"><h1 className='mx-5 text-white text-3xl font-bold'>Bloger</h1></Link>
        <div className="flex items-center">
            {!user ?<Link to="/login"><button className='text-white bg-[rgba(251,49,204)] mr-[50px] w-[80px] h-[45px] border-none outline-none text-[17px] rounded-[10px] cursor-pointer mx-3'>Sign in</button></Link>:<div className="mr-5 relative"  ref={dropDownRef}>
                <div onClick={handleDropDown} className='cursor-pointer rounded-full overflow-hidden 'style={{
                    width:"50px",
                    height:"50px",
                    cursor:"pointer",
                }}>
                    <img className='w-full h-full object-cover' src={`${baseUrl}/images/${user.profile}`} alt="" />
                </div>
                {isOpen && 
                <ul className='absolute right-0 mt-1 w-40 bg-black text-zinc-200 shadow-lg rounded-lg overflow-hidden z-50 px-2 py-1'>
                    {user.role==="admin" ? <li className='duration-300 p-1  hover:bg-[rgba(251,49,204)]'><Link to="/dashboard">Dashboard</Link></li>:""}
                    <li className='duration-300 p-1  hover:bg-[rgba(251,49,204)]'><Link to={`/profile/${user._id}`}>Profile</Link></li>
                    <li className='duration-300 p-1  hover:bg-[rgba(251,49,204)]'><Link onClick={handleLogout} style={{cursor:"pointer"}}>Sign out</Link></li>
                </ul>}
            </div>}
            
        </div>
    </nav>
    </>
  )
}

export default Navbar