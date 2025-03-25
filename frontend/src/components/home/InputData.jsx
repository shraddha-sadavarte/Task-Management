import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InputTask = ({ closeModal, refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const addTask = async () => {
    const userId = localStorage.getItem("id");

    if (!userId || !title.trim() || !description.trim()) {
        console.error("❌ Missing required fields");
        return;
    }

    const payload = {
        title,
        description,
        user: userId
    };

    console.log("📤 Sending data to backend:", payload);

    try {
        const response = await axios.post("http://localhost:1000/api/v2/add-task", payload, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("✅ Backend Response:", response);

        if (response.status === 201 && response.data.task) {
            console.log("✅ Task added successfully:", response.data.task);

            // Refresh the task list
            refreshTasks();

            // Close the modal
            closeModal();
        } else {
            console.error("❌ Unexpected Response:", response.data);
        }
    } catch (error) {
        console.error("❌ Error adding task:", error.response?.data || error.message);
    }
};


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg text-black">
        <h2 className="text-xl mb-4">Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mb-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 mb-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
        <button
          onClick={closeModal}
          className="ml-2 text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InputTask;
