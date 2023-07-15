import {
    getDoctorList,
    getDoctorListByName,
    addDoctor,
    deleteDoctorList
} from "../controllers/doctorListController.js";
import { getDoctorNames } from "../controllers/bookAppointmentController.js";
import { upload } from "../controllers/photoUploadController.js";
import express from "express";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/adddoctor").post( checkAuth("Admin"), upload.single("doctorPhoto"), addDoctor );
router.route("/doctorlist").get( getDoctorList );
router.route("/doctorlist/:name").get( getDoctorListByName );
router.route("/doctor").get( getDoctorNames );
router.route("/deletelist").delete(deleteDoctorList);

export default router;