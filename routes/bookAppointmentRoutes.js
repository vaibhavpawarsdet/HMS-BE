import {
    addBookAppointment,
    getAllAppointments,
    getAppointmentsByDoctorNames
} from "../controllers/bookAppointmentController.js";
import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/bookapp").post(verifyToken, addBookAppointment);
router.route("/appointment/doctor/:doctorName").get(checkAuth("Docter"), getAppointmentsByDoctorNames);
router.route("/allappointments").get(checkAuth("Docter"), getAllAppointments)

export default router;