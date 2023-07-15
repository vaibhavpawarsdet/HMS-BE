import {
    addBookAppointment,
    getAllAppointments,
    getAppointmentsByDoctorNames,
    getAppointmentsByPatientId,
    deleteAllAppointments,
    getAppointmentsByDoctorId
} from "../controllers/bookAppointmentController.js";
import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/bookapp").post(verifyToken, addBookAppointment);
router.route("/appointment/:doctorName").get(checkAuth("Doctor"), getAppointmentsByDoctorNames);
router.route("/allappointments").get(checkAuth("Doctor"), getAllAppointments)
router.route("/appointment/patient/:patientId").get(checkAuth("User"), getAppointmentsByPatientId);
router.route("/deleteappointments").delete( deleteAllAppointments );
router.route("/appointments/doctor/:doctorId").get( checkAuth("Doctor"), getAppointmentsByDoctorId);

export default router; 