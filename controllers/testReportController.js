import TestReport from "../models/testReport.js";

export const generateTestReport = async (req, res) => {
    try {
        const { patientName, patientId, age, sex, registeredOn, testReportForm } = req.body;

        //create a test report
        let testReport = new TestReport({
            patientName, patientId, age, sex, registeredOn, testReportForm,
        });
        await testReport.save();
        return res.status(201).json(testReport);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    };
};

export const getAllTestReport = async (req, res) => {
    try {
        //get a generated test report
        const testReport = await TestReport.find();
        if (!testReport) {
            return res.status(404).json({ message: "No test report found" });
        }
        res.status(200).json(testReport);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
};

export const getTestReportByPatientName = async (req, res) => {
    try {
        const { patientName } = req.params;
        console.log(patientName);
        const testReport = await TestReport.find({ patientName });
        if (!testReport) {
            return res.status(404).json({ error: 'Test report not found' });
        }
        res.status(200).json(testReport);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
};

export const getTestReportByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        console.log(patientName);
        const testReport = await TestReport.find({ patientId });
        if (!testReport) {
            return res.status(404).json({ error: 'Test report not found' });
        }
        res.status(200).json(testReport);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
};