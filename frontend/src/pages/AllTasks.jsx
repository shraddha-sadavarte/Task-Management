import React, { useState } from 'react';
import Cards from '../components/home/Cards';
import { IoAddCircleSharp } from 'react-icons/io5';
import InputData from '../components/home/InputData';

const AllTasks = () => {
  const [showModal, setShowModal] = useState(false); // ✅ Manage modal visibility

  return (
    <>
      <div>
        <div className='w-full flex justify-end px-4 py-2'>
          <button onClick={() => setShowModal(true)}> {/* ✅ Open modal */}
            <IoAddCircleSharp className="text-5xl text-gray-700 hover:text-gray-500 hover:cursor-pointer transition-all duration-300" />
          </button>
        </div>
        <Cards home={"true"} setShowModal={setShowModal} /> {/* ✅ Pass setShowModal to Cards */}
      </div>

      {showModal && <InputData closeModal={() => setShowModal(false)} />} {/* ✅ Show modal only when needed */}
    </>
  );
};

export default AllTasks;
