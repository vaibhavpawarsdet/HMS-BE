import DoctorList from "../models/doctorList.js";
import fs from "fs";
import path, { resolve } from "path";

export const addDoctor = async (req, res) => {
    try {
        const { name, specialization, description } = req.body;
        const __dirname = resolve();
        //Add a new doctor to list
        const doctor = new DoctorList({
            name,  
            description, 
            specialization,
            doctorPhoto: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        });
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ messgae: "Internal server error" });
    };
};

export const getDoctorListByName = async (req, res) => {
    try {
        const { name } = req.params;
        console.log(name);
        const doctorList = await DoctorList.findOne({ name });
        if (!doctorList) {
            res.status(404).json({ messgae: "Doctor is not found" });
        }
        res.status(200).json(doctorList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ messgae: "Internal Server error" });
    }; 
};    

export const getDoctorList = async (req, res) => {
    try {
        const doctorList = await DoctorList.find();
        if (!doctorList) {
            res.status(404).json({ messgae: "Doctor list not found" });
        };
        
        res.status(200).json(doctorList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ messgae: "Internal server error" });
    };
};