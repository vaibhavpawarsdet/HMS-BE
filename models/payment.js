import mongoose, { Schema } from "mongoose";

const paymentSchema = new mongoose.Schema({
    currency: {
        type: String,
    },
    consultationFees: {
        type: String,
    },
},
{timestamps: true},
);

const PaymentSchema = mongoose.model("PaymentSchema", paymentSchema);
export default PaymentSchema;