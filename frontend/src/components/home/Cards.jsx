import React, { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoAddCircleSharp } from 'react-icons/io5';
import axios from 'axios';
import EditTaskModal from '../../pages/EditTaskModel'; //Import Edit Modal Component
import InputData from './InputData';

const Cards = ({ filter, setShowModal }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited
  const userId = localStorage.getItem("id");
  const [showModal, setShowModal] = useState(false);

  // Get API URL based on filter
  const getTasksUrl = () => {
    switch (filter) {
      case "completed":
        return "http://localhost:1000/api/v2/get-complete-tasks";
      case "important":
        return "http://localhost:1000/api/v2/get-imp-tasks";
      case "incomplete":
        return "http://localhost:1000/api/v2/get-incomplete-tasks";
      default:
        return "http://localhost:1000/api/v2/get-all-tasks";
    }
  };

  // Fetch Tasks from Backend
  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return console.error("User ID not found in localStorage");

      try {
        const response = await axios.get(getTasksUrl(), {
          headers: { "id": userId },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId, filter]);

  //Toggle Task Completion
  const toggleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:1000/api/v2/update-complete-task/${id}`, {}, { headers: { "id": userId } });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, complete: !task.complete } : task
        )
      );
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  // Toggle Task Importance
  const toggleImportant = async (id) => {
    try {
      await axios.put(`http://localhost:1000/api/v2/update-imp-task/${id}`, {}, { headers: { "id": userId } });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, important: !task.important } : task
        )
      );
    } catch (error) {
      console.error("Error updating task importance:", error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, { headers: { "id": userId } });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className='flex flex-col justify-between bg-gray-700 rounded-sm p-4'>
            <div>
              <h3 className='text-xl font-semibold'>{task.title}</h3>
              <p className='text-gray-300 my-2'>{task.description}</p>
            </div>
            <div className='mt-4 w-full flex items-center'>
              <button
                onClick={() => toggleComplete(task._id)}
                className={`${task.complete ? "bg-green-400" : "bg-red-400"} text-black p-2 rounded`}
              >
                {task.complete ? "Completed" : "Incomplete"}
              </button>
              <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                <button onClick={() => toggleImportant(task._id)}>
                  <CiHeart className={`${task.important ? "text-red-500" : "text-white"}`} />
                </button>
                <button onClick={() => setEditingTask(task)}> {/* ✅ Open Edit Modal */}
                  <FaEdit />
                </button>
                <button onClick={() => deleteTask(task._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center col-span-3">No tasks found.</p>
      )}

      {filter === "all" && (
        <div
          className='flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 text-gray-300 hover:cursor-pointer hover:scale-105 transition-all duration-300'
          onClick={() => setShowModal(true)}
        >
          <IoAddCircleSharp className='text-5xl' />
          <h2 className='text-2xl mt-4'>Add Task</h2>
        </div>
      )}

      {/*show model for adding task*/}
      {showModal && <InputData closeModal={()=>setShowModal(false)} />}

      {/* Show Edit Modal when task is selected */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          closeModal={() => setEditingTask(null)}
          refreshTasks={setTasks} 
        />
      )}
    </div>
  );
};

export default Cards;
