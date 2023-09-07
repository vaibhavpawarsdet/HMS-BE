import mongoose from "mongoose";

const billingModel = new mongoose.Schema({
    item: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: String,
    },
    totalPrice: {
        type: Number,
    },
},
    { timestamps: true }
);

const Billing = mongoose.model('Billing', billingModel);
export default Billing;
