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

 // get all tasks
router.get("/get-all-tasks", async (req, res) => {
  try {
    console.log("🟢 Headers received:", req.headers);

    const userId = req.headers.id;

    // Validate user ID
    if (!userId) {
      return res.status(400).json({ message: "User ID is required in headers" });
    }

    // Find user and populate tasks
    const userData = await User.findById(userId).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });

    // Check if user exists
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure tasks exist
    const tasks = userData.tasks || []; // Default to an empty array

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


  //delete task
  router.delete("/delete-task/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;
      const { id: userId } = req.headers; // User ID from headers for validation
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required in headers" });
      }
  
      // Find the task to check ownership
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Ensure the task belongs to the authenticated user
      if (task.user.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized to delete this task" });
      }
  
      // Delete the task
      await Task.findByIdAndDelete(taskId);
  
      // Remove the task reference from the user's tasks array
      await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  //update task
  router.put("/update-task/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;
      const { id: userId } = req.headers; // User ID from headers for validation
      const { title, description } = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required in headers" });
      }
  
      // Find the task to check ownership
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Ensure the task belongs to the authenticated user
      if (task.user.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized to update this task" });
      }
  
      // Update the task details
      if (title) task.title = title;
      if (description) task.description = description;
  
      await task.save();
  
      res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// Update Important Task
router.put("/update-imp-task/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;
      const { id: userId } = req.headers; // User ID from headers for validation
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required in headers" });
      }
  
      // Fetch the task to check ownership and current 'important' status
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Ensure the task belongs to the authenticated user
      if (task.user.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized to update this task" });
      }
  
      // Toggle the 'important' field
      task.important = !task.important;
      await task.save();
  
      res.status(200).json({ message: "Task importance toggled successfully", task });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  //update complete task
router.put("/update-complete-task/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;
      const { id: userId } = req.headers; // User ID from headers for validation
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required in headers" });
      }
  
      // Fetch the task to check ownership and current 'complete' status
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Ensure the task belongs to the authenticated user
      if (task.user.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized to update this task" });
      }
  
      // Toggle the 'complete' field
      task.complete = !task.complete;
      await task.save();
  
      res.status(200).json({ message: "Task completion status toggled successfully", task });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  //get important task
  router.get("/get-imp-tasks", async (req, res) => {
    try {
      const { id } = req.headers;
  
      // Validate user ID
      if (!id) {
        return res.status(400).json({ message: "User ID is required in headers" });
      }
  
      // Find user and populate tasks
      const userData = await User.findById(id).populate({
        path:"tasks",
        match: {important: true }, 
        options: {sort :{ createdAt: -1}}});
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ tasks: userData.tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  //get complete tasks
  router.get("/get-complete-tasks", async (req, res) => {
    try {
      const { id } = req.headers;
  
      // Validate user ID
      if (!id) {
        return res.status(400).json({ message: "User ID is required in headers" });
      }
  
      // Find user and populate tasks
      const userData = await User.findById(id).populate({
        path:"tasks",
        match: {complete: true }, 
        options: {sort :{ createdAt: -1}}});
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ tasks: userData.tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  //get incomplete task
  router.get("/get-incomplete-tasks", async (req, res) => {
    try {
      const { id } = req.headers;
  
      // Validate user ID
      if (!id) {
        return res.status(400).json({ message: "User ID is required in headers" });
      }
  
      // Find user and populate tasks
      const userData = await User.findById(id).populate({
        path:"tasks",
        match: {complete: false }, 
        options: {sort :{ createdAt: -1}}});
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ tasks: userData.tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  //Add Task API
router.post("/add-task", async (req, res) => {
  try {
      const { title, description } = req.body;
      const userId = req.headers.id;

      if (!title || !description || !userId) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      const newTask = new Task({
          title,
          description,
          complete: false,
          important: false,
          userId,
      });

      const savedTask = await newTask.save();
      res.status(201).json({ message: "Task added successfully", task: savedTask });

  } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});
  
export default router;
