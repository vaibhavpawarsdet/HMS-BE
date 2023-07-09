import BookAppointment from '../models/appointment.js';
import Profile from "../models/profile.js";
import User from "../models/user.js";
import DoctorList from '../models/doctorList.js';

export const getDoctorNames = async (req, res) => {
    try {
        //const { date } = req.body;
        const doctors = await DoctorList.find({}, 'name');

        if (doctors.length === 0) {
            return res.status(404).json({ message: "Doctor list not found" });
        }

        const simplifiedDoctors = doctors.map(doctor => {
            return {
                name: doctor.name,
            };
        });
        res.status(200).json(simplifiedDoctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addBookAppointment = async (req, res) => {
    try {
        const userId = req.user.userId;
        //const patientId = req.params;
        const user = await User.findById(userId);
        console.log(userId);
        const { date, doctorName } = req.body;
        //fetching user profile the username and patientId
        const profile = await Profile.findOne({ user: userId });
        console.log(profile);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        
        //Create a new Appointment instance
        const appointment = new BookAppointment({
            date, doctorName,
            username: user.username,
            user: profile.user,
            patientId: profile.patientId,
        });

        //Save the appointment to the database
        await appointment.save();
        res.status(201).json( appointment );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAppointmentsByDoctorNames = async (req, res) => {
    try {
        const { doctorName } = req.params;

        //Find appointments by doctorName
        const appointments = await BookAppointment.find({ doctorName });

        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });
    }
}; 

export const getAllAppointments = async (req, res) => {
    try {
        //fetch all appointments
        const appointmentList = await BookAppointment.find();

        res.status(200).json(appointmentList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
