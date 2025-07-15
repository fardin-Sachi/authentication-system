import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name."],
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "You must provide a password."],
        minlength: [6, "Minimum 6 characters are required."],
    }
}, {timestamps: true})

export default mongoose.model('User', UserSchema)