import mongoose from "mongoose";

const doctorDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    doctorId: {
        type: String,
    },
    specialization: {
        type: String,
    },
    description: {
        type: String,
    },
    consultationFees: {
        type: Number,
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