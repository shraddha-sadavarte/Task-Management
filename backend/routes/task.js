import express from "express";
import Task from "../models/task.js";
import User from "../models/user.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/create-task", async (req, res) => {
    try {
        const { title, description, userId } = req.body; // ✅ Make sure to send `description` and `userId`

        // Validate required fields
        if (!title || !description || !userId) {
            return res.status(400).json({ message: "Title, description, and userId are required" });
        }

        // Validate user ID format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new task
        const newTask = new Task({ title, description, user: userId });
        const savedTask = await newTask.save();

        // Update the user document with the new task
        await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

        res.status(201).json({ message: "Task Created", taskId: savedTask._id });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
