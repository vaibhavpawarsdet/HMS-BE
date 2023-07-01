import mongoose from "mongoose";
import validator from "validator";

//Users Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [20, "Name should be under 40 characters"],
    },
    lastVisitedAt: Date,
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validate: [validator.isEmail, "Please enter email in correct format"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: [validator.isStrongPassword, "Please enter a strong password"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // profile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Profile",
    // }
});

export default mongoose.model("User", userSchema);