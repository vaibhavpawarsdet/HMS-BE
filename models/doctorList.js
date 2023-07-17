import mongoose from "mongoose";

const doctorDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    doctorId: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    consultationFees: {
        type: Number,
        required: true
    },
    doctorPhoto: {
        data: Buffer,
        contentType: String
    },
},
    { timestamps: true }
);
const DoctorList = mongoose.model("DoctorList", doctorDetailsSchema);
export default DoctorList;