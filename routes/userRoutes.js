import express from "express";
import { signup } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

export default router;