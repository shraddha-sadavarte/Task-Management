import React, { useState } from 'react'
import {RxCross2} from 'react-icons/rx'

const InputData = ({ closeModal }) => {
   
    const [isOpen, setIsOpen] = useState(true); //controls visibility

    if(!isOpen) return null; //if model is closed, return nothing (hide it)
  return (
    <>
      <div className='fixed top-0 left-0 bg-gray-800 opacity-50 h-screen w-full'></div>
      <div className='fixed top-0 left-0 bg-gray-800 flex items-center justify-center opacity-80 h-screen w-full'>
        <div className='w-2/6 bg-gray-900 p-4 rounded'>
        <div className='flex justify-end'>
            <button onClick={closeModal} className='text-white text-xl hover:text-red-500 transition'> 
                <RxCross2 />
            </button>
        </div>
            <input 
                type='text' 
                placeholder='Title' 
                name='title' 
                className='px-3 py-2 rounded w-full bg-gray-700 my-3'
            />
            <textarea 
                name='' 
                id='' 
                cols="30" 
                rows="10" 
                placeholder='Description' 
                className='px-3 py-2 bg-gray-700 w-full rounded my-3' 
            />
            <button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold hover:cursor-pointer hover:bg-blue-500'>Submit</button>
        </div>
      </div>
    </>
  )
}

export default InputData
