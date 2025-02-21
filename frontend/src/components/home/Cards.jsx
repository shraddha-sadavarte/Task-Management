import React from 'react'
import {CiHeart} from 'react-icons/ci'
import {FaEdit} from 'react-icons/fa'
import { MdDelete } from 'react-icons/md';

const Cards = () => {

    const data = [
        {
            title: "The Best Coding Channel",
            desc: "I have to create my channe; the best ever coding channel in hindi for those who do not understand english",
        },
        {
            title: "CPP Concepts",
            desc: "I need to clear basics of cpp. Topics: Abstraction, Inheritance, Encapsulation, Polymorphism",
        },
        {
            title: "Insem study",
            desc: "My insem on 14th march, I need to study",
        },
        {
            title: "Projects",
            desc: "I need to create at least 2 projects until BE",
        },
    ];
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      {data && data.map((items,i) => (
        <div className=' flex flex-col justify-between bg-gray-700 rounded-sm p-4'>
            <div>
                <h3 className='text-xl font-semibold'>{items.title}</h3>
                <p className='text-gray-300 my-2'>{items.desc}</p>
            </div>
            <div className='mt-4 w-full flex items-center'>
                <button className='bg-red-400 text-black-200 p-2 rounded'>InCompleted</button>
                <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                    <button>
                        <CiHeart />
                    </button>
                    <button>
                        <FaEdit />
                    </button>
                    <button>
                        <MdDelete />
                    </button>
                </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Cards
