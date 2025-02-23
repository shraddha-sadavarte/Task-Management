import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoAddCircleSharp } from 'react-icons/io5';

const Cards = ({ home, setShowModal }) => {  // ✅ Destructure home correctly

  // Store data as state so each card has its own status
  const [data, setData] = useState([
    { id: 1, title: "The Best Coding Channel", desc: "I have to create my channel; the best ever coding channel in Hindi for those who do not understand English.", status: "Incomplete" },
    { id: 2, title: "CPP Concepts", desc: "I need to clear basics of C++. Topics: Abstraction, Inheritance, Encapsulation, Polymorphism.", status: "Incomplete" },
    { id: 3, title: "Insem study", desc: "My insem on 14th March, I need to study.", status: "Incomplete" },
    { id: 4, title: "Projects", desc: "I need to create at least 2 projects until BE.", status: "Incomplete" }
  ]);

  // Toggle the button for the specific card
  const toggleImportant = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Incomplete" ? "Complete" : "Incomplete" }
          : item
      )
    );
  };

  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {data.map((items) => (
        <div key={items.id} className='flex flex-col justify-between bg-gray-700 rounded-sm p-4'>
          <div>
            <h3 className='text-xl font-semibold'>{items.title}</h3>
            <p className='text-gray-300 my-2'>{items.desc}</p>
          </div>
          <div className='mt-4 w-full flex items-center'>
            <button
              onClick={() => toggleImportant(items.id)}
              className={`${items.status === "Incomplete" ? "bg-red-400" : "bg-green-400"} text-black p-2 rounded`}
            >
              {items.status}
            </button>
            <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
              <button><CiHeart /></button>
              <button><FaEdit /></button>
              <button><MdDelete /></button>
            </div>
          </div>
        </div>
      ))}

      {/* ✅ Fix: Add Task should now be visible when home is "true" */}
      {home === "true" && (
        <div className='flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 text-gray-300 hover:cursor-pointer hover:scale-105 transition-all duration-300'
            onClick={() => setShowModal(true)}
        >
          <IoAddCircleSharp className='text-5xl' />
          <h2 className='text-2xl mt-4'>Add Task</h2>
        </div>
      )}
    </div>
  );
};

export default Cards;
