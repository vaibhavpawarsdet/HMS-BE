import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    item: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: String,
        required: true,
    },
});
const billingModel = new mongoose.Schema({
    patientName: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    mobileNo: {
        type: Number,
    },
    address: {
        type: String,
    },
    items: [itemSchema],
    totalPrice: {
        type: Number,
    },
},
    { timestamps: true }
);

const Billing = mongoose.model('Billing', billingModel);
export default Billing;
