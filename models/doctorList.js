import mongoose from "mongoose";

const doctorDetailsSchema = new mongoose.Schema({
    doctorPhoto: {
        type: String,
    },
    name: {
        type: String,
        unique: true,
    },
    specialization: {
        type: String,
    },
    description: {
        type: String,
    },
},
    { timestamps: true }
);

const DoctorList = mongoose.model("DoctorList", doctorDetailsSchema);
export default DoctorList;