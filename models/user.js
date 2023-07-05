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
    role: {
        type: String,
        enum: ["Docter", "User", "Admin"],
        required: true,
    },
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;