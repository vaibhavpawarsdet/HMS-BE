import express from "express";
import stripe from "stripe";
import PaymentSchema from "../models/payment.js";
import * as dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
//console.log(stripeSecretKey);
const stripeAPIVersion = "2022-08-01";
const stripeInstance = stripe(stripeSecretKey, {
    apiVersion: stripeAPIVersion,
    // Set the authorization header
    // requestOptions: {
    //   headers: {
    //     Authorization: `Bearer ${stripeSecretKey}`,
    //   },
    // }
});

router.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

router.post("/create-payment-intent", async (req, res) => {
    try {
        const { currency, consultationFees } = req.body;

        const paySchema = new PaymentSchema({ currency, consultationFees });
        const savedPayment = await paySchema.save();
        //res.status(201).json(paySchema);
        //console.log(paySchema);
        //console.log(stripeInstance);
        const paymentIntent = await stripeInstance.paymentIntents.create({
            currency: currency,
            amount: consultationFees,
            automatic_payment_methods: { enabled: true },
        });

        // Send publishable key and PaymentIntent details to the client
        res.send({
            clientSecret: paymentIntent.client_secret,
            savedPayment: savedPayment,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Internal server error" });
    }
});

export default router;