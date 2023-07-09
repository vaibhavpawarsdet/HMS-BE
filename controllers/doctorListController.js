import DoctorList from "../models/doctorList.js";

export const addDoctor = async (req, res) => {
    try {
        const { name, doctorPhoto, specialization, description } = req.body;
        //Add a new doctor to list
        const doctor = new DoctorList({
            name,  
            description, 
            specialization,
        });
        // Handle doctor photo upload
        if (req.file) {
            doctor.doctorPhoto = req.file.filename;
        };
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