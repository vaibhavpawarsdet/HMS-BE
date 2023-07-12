import {
    addBookAppointment,
    getAllAppointments,
    getAppointmentsByDoctorNames,
    getAppointmentsByPatientId
} from "../controllers/bookAppointmentController.js";
import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/bookapp").post(verifyToken, addBookAppointment);
router.route("/appointment/doctor/:doctorName").get(checkAuth("Docter"), getAppointmentsByDoctorNames);
router.route("/allappointments").get(checkAuth("Docter"), getAllAppointments)
router.route("/appointment/patient/:patientId").get(checkAuth("User"), getAppointmentsByPatientId);
export default router;