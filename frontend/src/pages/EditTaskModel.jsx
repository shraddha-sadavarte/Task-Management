import React, { useState } from "react";
import axios from "axios";

const EditTaskModal = ({ task, closeModal, refreshTasks }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const userId = localStorage.getItem("id");

  // Update Task in Backend
  const updateTask = async () => {
    try {
        const response = await axios.put(
            `http://localhost:1000/api/v2/update-task/${task._id}`,
            { title, description },
            { headers: { "id": userId } }
        );

        // Update task instantly in UI
        refreshTasks((prevTasks) =>
            prevTasks.map((t) => 
                t._id === task._id ? { ...t, title, description } : t
            )
        );

        closeModal(); // Close modal after update
    } catch (error) {
        console.error("Error updating task:", error);
    }
};


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold text-white mb-4">Edit Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Task Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Task Description"
        />
        <div className="mt-4 flex justify-end">
          <button onClick={closeModal} className="mr-2 p-2 bg-red-500 text-white rounded">Cancel</button>
          <button onClick={updateTask} className="p-2 bg-green-500 text-white rounded">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
