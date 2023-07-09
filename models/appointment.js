import mongoose, { Schema } from "mongoose";

const bookAppointmentSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
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
        ref: 'Profile',
        required: true,
    },
},
    { timestamps: true }
);

const BookAppointment = mongoose.model("BookAppointment", bookAppointmentSchema);
export default BookAppointment;