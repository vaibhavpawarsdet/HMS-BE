import mongoose, { Schema } from "mongoose";

const bookAppointmentSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true,
    },
    consultationFees: {
        type: Number,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: Schema.Types.String,
        ref: "User",
        required: true,
    },
    patientId: {
        type: Schema.Types.String,
        ref: 'User',
        required: true,
    },
    doctorId: {
        type: Schema.Types.String,
        ref: 'DoctorList',
       // required: true,
    },
},
    { timestamps: true }
);

const BookAppointment = mongoose.model("BookAppointment", bookAppointmentSchema);
export default BookAppointment;