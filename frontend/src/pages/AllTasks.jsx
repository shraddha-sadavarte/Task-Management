import React, { useState } from 'react';
import Cards from '../components/home/Cards';
import { IoAddCircleSharp } from 'react-icons/io5';
import InputData from '../components/home/InputData';

const AllTasks = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <div className='w-full flex justify-end px-4 py-2'>
          <button onClick={() => setShowModal(true)}>
            <IoAddCircleSharp className="text-5xl text-gray-700 hover:text-gray-500 hover:cursor-pointer transition-all duration-300" />
          </button>
        </div>
        <Cards filter="all" setShowModal={setShowModal} />
      </div>

      {showModal && <InputData closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default AllTasks;
