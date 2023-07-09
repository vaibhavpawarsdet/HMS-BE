import { getTestReportByPatientId } from "../controllers/medicalHistoryController.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route('/patientreport/:patientId').get( verifyToken, getTestReportByPatientId );

export default router;