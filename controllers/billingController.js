import Billing from "../models/billing.js";
import Lists from "../models/lists.js";

export const createBills = async (req, res) => {
    try {
        const {item, quantity, price, totalPrice} = req.body;
        //create a new bill
        let createBill = new Billing({ item, quantity, price, totalPrice });
        //save bill
        await createBill.save();
        return res.status(201).json(createBill);
    } catch (error) {
        console.error('Add Bill controller', error);
        return res.status(500).json({ message: 'Internal server error in the add bill'});
    }
};

export const addListsPrices = async (req, res) =>{
    try {
        const { list, price } = req.body;
        //add new items
        let addLists = new Lists({ list, price });
        await addLists.save();
        return res.status(201).json(addLists)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "add lists and prices Internal server error"})
    }
}

export const getListPrices = async (req, res) => {
    try {
        const lists = await Lists.find({}, { list: 1, price: 1, _id: 0 });
        if (!lists) {
            return res.status(404).json({ message: 'lists not found'});
        };
        res.status(200).json(lists);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error in the getListsPrices' });
    }
};

export const getBill = async ( req, res) => {
    try {
        const bills = await Billing.find({});
        if (!bills) {
            return res.status(404).json({ message: 'No bill found'});
        }
        res.status(200).json(bills);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error in the getBill'});
    }
};
