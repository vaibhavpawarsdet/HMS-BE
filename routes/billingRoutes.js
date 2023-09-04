import express from "express";
import { createBills, getBill } from "../controllers/billingController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/addbill').post(checkAuth("Admin"), createBills);
router.route('/getbill').get(checkAuth("Admin"), getBill);

export default router;
