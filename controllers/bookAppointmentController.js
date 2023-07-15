import BookAppointment from '../models/appointment.js';
import Profile from "../models/profile.js";
import User from "../models/user.js";
import DoctorList from '../models/doctorList.js';

export const addBookAppointment = async (req, res) => {
    try {
        const userId = req.user.userId;
        //const patientId = req.params;
        const user = await User.findById(userId);
        //console.log(userId);
        const { date, time, consultationFees, doctorName } = req.body;

        //fetching user profile the username and patientId
        const profile = await Profile.findOne({ user: userId });
        // console.log(profile);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        const doctorLists = await DoctorList.find({});
        //Create a new Appointment instance
        const appointment = new BookAppointment({
            date, doctorName,
            time, consultationFees,
            username: user.username,
            user: profile.user,
            patientId: profile.patientId,
            doctorId: doctorLists.doctorId,
        });
        const doctorList = await DoctorList.findOne({ name: doctorName });
        if (!doctorList) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        appointment.doctorId = doctorList.doctorId;
        //Save the appointment to the database
        await appointment.save();
        //console.log(appointment);
        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAppointmentsByDoctorId = async (req, res) => {
    try {
        const { doctorId } = req.params;
        //console.log(doctorId);
        const appointments = await BookAppointment.find({ doctorId });
        //console.log(doctorId);
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });
    }
};

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

export const getAppointmentsByPatientId = async (req, res) => {
    try {
        const userId = req.user.userId;
        //const patientId = req.params;
        const user = await User.findById(userId);
        // console.log(userId);
        const { date, doctorName } = req.body;
        //fetching user profile the username and patientId
        const profile = await Profile.findOne({ user: userId });
        //console.log(profile);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        // const patientId = profile.patientId;
        // console.log(patientId);
        //Find appointments by doctorName
        const appointments = await BookAppointment.find({ patientId: profile.patientId });
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export const deleteAllAppointments = async (req, res) => {
    try {
        // Delete all documents in the BookAppointment collection
        await BookAppointment.deleteMany();

        res.status(200).json({ message: "All appointments deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

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
                consultationFees: doctor.consultationFees,
            };
        });
        res.status(200).json(simplifiedDoctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};