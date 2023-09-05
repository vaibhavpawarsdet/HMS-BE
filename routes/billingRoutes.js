import express from "express";
import { createBills, getBill, addListsPrices, getListPrices } from "../controllers/billingController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/addbill').post(checkAuth("Admin"), createBills);
router.route('/getbill').get(checkAuth("Admin"), getBill);
router.route('/additems').post(addListsPrices);
router.route('/getlist').get(checkAuth("Admin"), getListPrices);

export default router; 
