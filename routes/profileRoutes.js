import { getProfileDetails } from "../controllers/profileController.js";
import verifyToken from "../middleware/verifyToken.js";
import { profileUpdate } from "../controllers/profileController.js";
import express from "express";
import { upload } from "../controllers/photoUploadController.js";

const router = express.Router();

router.route("/profile").get(verifyToken, getProfileDetails);
router.route("/updateprofile").put(verifyToken, upload.single("profilePhoto"), profileUpdate);

export default router;