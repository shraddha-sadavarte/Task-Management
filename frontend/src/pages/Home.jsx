import React from 'react'
import Sidebar from '../components/home/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='flex h-[98vh] gap-4'>
        {/* width: 16.666667%; */}
      <div className='w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between'><Sidebar /></div>  
      <div className='w-5/6 border border-gray-500 rounded-xl p-4'><Outlet /></div>
    </div>
  )
}

export default Home
