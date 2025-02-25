import React from 'react'
import {Link} from 'react-router-dom'

const Signup = () => {
  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 bg-gray-800 rounded'>
        <div className='text-2xl font-semibold'>Signup</div>
        <input type='username' placeholder='Username' name='username' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' required/> 
        <input type='email' placeholder='Email' name='xyz@example.com' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' required/> 
        <input type='password' placeholder='Password' name='Password' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' required/> 
        <div className='w-full flex items-center justify-between'>
            <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded'>Signup</button>
            <Link to="/login" className='text-gray-400 hover:text-gray-200' >Already having an account? Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
