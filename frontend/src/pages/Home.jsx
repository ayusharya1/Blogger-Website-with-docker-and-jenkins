import React from 'react'
import RecentPost from '../Components/RecentPost'

function Home() {
  return (
   <>
    <div className='w-full bg-[#212529] text-center relative flex flex-col justify-center items-center text-white hero-section'>
        <h1 className='text-4xl font-black text-white capitalize'>Welcome to my blog</h1>
        <p className='text-white text-2xl font-semibold mt-3'>
            Dive into a world of creativity,insights,and inspiration. Discover the extraordinary in the ordinary.
        </p>
    </div>
    <div className='w-full'>
        <RecentPost/>
    </div>
   </>
  )
}

export default Home