import express from "express";
import { generateTestReport } from "../controllers/testReportController.js";
import { getTestReportByPatientName } from "../controllers/testReportController.js";
import { getAllTestReport } from "../controllers/testReportController.js";
import { getTestReportByPatientId } from "../controllers/testReportController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/test-report').post( checkAuth("Admin"), generateTestReport );
router.route('/test-report/:patientName').get( checkAuth("Admin"), getTestReportByPatientName );
router.route('/test-report/:patientId').get( checkAuth("Admin"), getTestReportByPatientId );
router.route('/test-report').get(checkAuth("Admin"), getAllTestReport );

export default router;