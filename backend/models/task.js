import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },

    description: {
        type: String,
        required: true,
        unique: true,
    },

    important: {
        type: Boolean,
        default: false,
    },

    complete: {
        type: Boolean,
        default: false,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {timestamps: true} )

const Task = mongoose.model("Task", taskSchema);
export default Task;