import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
    }],
})

const User = mongoose.model("user", userSchema);
export default User;