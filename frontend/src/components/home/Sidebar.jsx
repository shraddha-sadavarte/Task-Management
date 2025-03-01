import React from 'react'
import {CgNotes} from "react-icons/cg";
import {MdLabelImportant} from 'react-icons/md';
import {FaCheckDouble} from 'react-icons/fa6';
import {TbNotebookOff} from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const data = [
        {
            title: "All tasks",
            icon: <CgNotes />,
            link: '/',
        },
        {
            title: "Important tasks",
            icon: <MdLabelImportant/>,
            link: '/importanttasks',
        },
        {
            title: "Completed tasks",
            icon: <FaCheckDouble />,
            link: '/completedtasks',
        },
        {
            title: "Incompleted tasks",
            icon: <TbNotebookOff />,
            link: '/incompletedtasks',
        },
    ];

  return (
    <>
    <div>
      <h2 className='text-xl font-semibold'>Shraddha Coding</h2>
      <h4 className='mb-1 text-grey-200'>shraddha24@gmail.com</h4>
      <hr />
    </div>

    <div>
        {data.map((items,i) => (
            <Link to={items.link} key={i} className='my-2 flex items-center hover:bg-gray-600 p-2 rounded transition:all duration-300 cursor-pointer'>
                {items.icon}&nbsp;
                {items.title}
            </Link>
        ))}
    </div>

    <div>
        <button className='bg-gray-600 w-full p-2 rounded cursor-pointer'>Log out</button>
    </div>

    </>
  )
}

export default Sidebar
