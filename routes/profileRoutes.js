import { getProfileDetails } from "../controllers/profileController.js";
import { verifyToken } from "../controllers/verifyToken.js";
import { profileUpdate } from "../controllers/profileController.js";
import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

//Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extensionName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extensionName && mimeType) {
            cb(null, true);
        } else {
            cb("Error: Images Only!");
        }
    },
});

router.route("/profile").get(verifyToken, getProfileDetails);
router.route("/updateprofile").put(verifyToken, upload.single("profilePhoto"), profileUpdate);

export default router;