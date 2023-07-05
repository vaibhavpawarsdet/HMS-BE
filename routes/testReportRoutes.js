import express from "express";
import { generateTestReport } from "../controllers/testReportController.js";
import { getTestReportByPatientName } from "../controllers/testReportController.js";
import { getAllTestReport } from "../controllers/testReportController.js";

const router = express.Router();

router.route('/test-report').post( generateTestReport );
router.route('/test-report/:patientName').get( getTestReportByPatientName );
router.route('/test-report').get( getAllTestReport );

export default router;