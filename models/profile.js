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
        unique: true,
    },
    profilePhoto: {
        type: String,
    },
    age: {
        type: Number,
        maxlength: [2, "Age should be under 2 characters"]
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    
    phone: {
        type: String,
        maxlength: [10, "Phone should be under 10 characters"],
        validate: [validator.isNumeric, "Please enter number into correct format"],
    },
    address: {
        type: String,
        maxlength: [100, "Address should be under 100 characters"],
    },
},
    { timestamps: true },
);

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
