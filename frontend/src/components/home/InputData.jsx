import React, { useState } from 'react';
import axios from 'axios';

const InputTask = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem("id");

  const addTask = async () => {
    try {
      await axios.post("http://localhost:1000/api/v2/add-task", {
        title,
        description
      }, { headers: { "id": userId } });

      closeModal(); // Close modal after adding task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl mb-4">Add New Task</h2>
        <input type="text" placeholder="Title" className="border p-2 mb-2 w-full"
          value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" className="border p-2 mb-2 w-full"
          value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
        <button onClick={closeModal} className="ml-2 text-gray-600">Cancel</button>
      </div>
    </div>
  );
};

export default InputTask;
