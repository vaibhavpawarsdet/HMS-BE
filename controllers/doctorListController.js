import DoctorList from "../models/doctorList.js";
import fs from "fs";
import path, { resolve } from "path";

export const addDoctor = async (req, res) => {
    try {
        const { name, doctorId, specialization, description, consultationFees } = req.body;
        const __dirname = resolve();
        //Add a new doctor to list
        const doctor = new DoctorList({
            name,
            doctorId,  
            description, 
            specialization,
            consultationFees,
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
        //console.log(consultationFees);
        const doctorList = await DoctorList.find({ name });
        if (!doctorList) {
            res.status(404).json({ messgae: "Doctor is not found" });
        }
        res.status(200).json(doctorList);
    } catch (error) 
    {
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
export const deleteDoctorList = async (req, res) => {
    try {
        // Delete all documents in the DoctorList collection
        await DoctorList.deleteMany();
        
        res.status(200).json({ message: "Doctor list deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
