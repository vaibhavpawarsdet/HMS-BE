import Profile from "../models/profile.js";
import TestReport from "../models/testReport.js";

export const getTestReportByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        //console.log(patientId);

        const patient = await Profile.findOne({ patientId });
        //console.log(patient);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        };

        //find the report associated with the patient
         const testReport = await TestReport.find({ patientId }).limit(5);
         
        if (!testReport) {
            return res.status(404).json({ error: 'Test report not found' });
        }
        res.status(200).json(testReport);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
};