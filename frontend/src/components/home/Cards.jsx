import React, { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoAddCircleSharp } from 'react-icons/io5';
import axios from 'axios';

const Cards = ({ home, setShowModal }) => {
  const [tasks, setTasks] = useState([]); // ✅ Store user-specific tasks
  const userId = localStorage.getItem("id"); //Get user ID from localStorage

  // ✅ Fetch user tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      try {
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", {
          headers: { "id": userId },
        });
        console.log("✅ Tasks fetched successfully:", response.data);
        setTasks(response.data.tasks); // ✅ Store tasks in state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]); // ✅ Run when userId changes

  // ✅ Toggle Task Completion Status
  const toggleImportant = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, status: task.status === "Incomplete" ? "Complete" : "Incomplete" } : task
      )
    );
  };

  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {/* ✅ Show fetched tasks */}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className='flex flex-col justify-between bg-gray-700 rounded-sm p-4'>
            <div>
              <h3 className='text-xl font-semibold'>{task.title}</h3>
              <p className='text-gray-300 my-2'>{task.description}</p>
            </div>
            <div className='mt-4 w-full flex items-center'>
              <button
                onClick={() => toggleImportant(task._id)}
                className={`${task.status === "Incomplete" ? "bg-red-400" : "bg-green-400"} text-black p-2 rounded`}
              >
                {task.status}
              </button>
              <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                <button><CiHeart /></button>
                <button><FaEdit /></button>
                <button><MdDelete /></button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center col-span-3">No tasks found.</p>
      )}

      {/* ✅ "Add Task" button (visible only when home is true) */}
      {home === "true" && (
        <div
          className='flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 text-gray-300 hover:cursor-pointer hover:scale-105 transition-all duration-300'
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
