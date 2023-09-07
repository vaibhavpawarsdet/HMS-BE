import mongoose from "mongoose";

const billingModel = new mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
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
