import mongoose from "mongoose";

const reportFormSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
    },
    standardValue: {
        type: String,
        required: true
    },
}
);

const patientDetailsSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    sex: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    registeredOn: {
        type: Date,
        default: Date.now,
        required: true,
    },
    testReportForm: reportFormSchema,
},
    { timestamps: true }
);

const TestReport = mongoose.model('TestReport', patientDetailsSchema);
export default TestReport;