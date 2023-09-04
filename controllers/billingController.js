import Billing from "../models/billing.js";

export const createBills = async (req, res) => {
    try {
        const {items, quantity, price, totalPrice} = req.body;
        //create a new bill
        let createBill = new Billing({ items, quantity, price, totalPrice });
        //save bill
        await createBill.save();
        return res.status(201).json(createBill);
    } catch (error) {
        console.error('Add Bill controller', error);
        return res.status(500).json({ message: 'Internal server error in the add bill'});
    }
};

export const getBill = async ( req, res) => {
    try {
        const bills = await Billing.find({});
        if (!bills) {
            return res.status(404).json({ message: 'No test report find'});
        }
        res.status(200).json(bills);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error in the getBill'});
    }
};
