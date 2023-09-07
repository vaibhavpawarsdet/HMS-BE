import mongoose from "mongoose";

const billingModel = new mongoose.Schema({
    items: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
},
    { timestamps: true }
);

const Billing = mongoose.model('Billing', billingModel);
export default Billing;
