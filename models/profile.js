import mongoose, { Schema } from "mongoose";
import validator from "validator";


//profile schema
const profileSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    patientId: {
        type: String,
        default: "Empty",
        unique: true,
        required: true,
    },
    profilePhoto: {
        type: String,
    },
    age: {
        type: Number,
        default: 0,
        required: [true, "Please provide age"],
        maxlength: [2, "Age should be under 2 characters"]
    },
    gender: {
        type: String,
        default: "Empty",
        enum: ["Male", "Female", "Other", "Empty"],
        required: true,
    },
    
    phone: {
        type: String,
        default: "0",
        required: true,
        maxlength: [10, "Phone should be under 10 characters"],
        validate: [validator.isNumeric, "Please enter number into correct format"],
    },
    address: {
        type: String,
        default: "Empty",
        required: true,
        maxlength: [100, "Address should be under 100 characters"],
    },
},
    { timestamps: true },
);

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;