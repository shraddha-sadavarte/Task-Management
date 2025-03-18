import express from "express";
import Task from "../models/task.js";
import User from "../models/user.js";

const router = express.Router();

// Protected Route: Create Task
router.post("/create-task", async (req, res) => {
    try {
      console.log("Headers:", req.headers); // Debugging
      console.log("Request Body:", req.body); // Debugging
  
      const { title, description } = req.body;
      const userId = req.headers.id; // Assuming user ID is sent in headers
  
      if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
      }
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      // Create new task
      const newTask = new Task({ title, description, user: userId });
      const savedTask = await newTask.save();
  
      // Add task to the user's task list
      await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });
  
      res.status(200).json({ message: "Task Created Successfully", task: savedTask });
  
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/get-all-tasks", async (req, res) => {
    try {
      const { id } = req.headers;
  
      // Validate user ID
      if (!id) {
        return res.status(400).json({ message: "User ID is required in headers" });
      }
  
      // Find user and populate tasks
      const userData = await User.findById(id).populate("tasks");
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ tasks: userData.tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  

export default router;
