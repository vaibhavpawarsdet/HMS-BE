import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    list: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
});

const Lists = mongoose.model('Lists', listSchema);
export default Lists;
