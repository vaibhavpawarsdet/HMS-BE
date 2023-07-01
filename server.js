import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectWithDb } from "./config/db.js";
import user from "./routes/userRoutes.js";
//import profile from "./routes/profileRoutes.js";

//express app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1", user);
//app.use("/api/v1", profile);

app.get("/", (req, res) => {
    res.status(200).json({ message: "HMS Server Started"});
});

//db connection
connectWithDb();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));