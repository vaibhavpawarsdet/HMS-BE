import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectWithDb } from "./config/db.js";
import user from "./routes/userRoutes.js";
import profile from "./routes/profileRoutes.js";
import testReport from "./routes/testReportRoutes.js";
import medicalHistory from "./routes/medicalHistoryRoutes.js";
import doctorList from "./routes/doctorListRoutes.js";
import bookAppointment from "./routes/bookAppointmentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import bodyParser from "body-parser";
import { resolve } from "path";

//express app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(process.env.STATIC_DIR));

//routes
app.use("/api/v1", user);
app.use("/api/v1", profile);
app.use("/api/v1", testReport);
app.use("/api/v1", medicalHistory);
app.use("/api/v1", doctorList);
app.use("/api/v1", bookAppointment);
app.use("/api/v1", paymentRoutes);


app.get("/", (req, res) => {
    const path = resolve(process.env.STATIC_DIR + "/index.html");
    res.sendFile(path);
});
app.get("/", (req, res) => {
    res.status(200).json({ message: "HMS Server Started" });
});

//db connection
connectWithDb();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));