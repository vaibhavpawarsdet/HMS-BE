// import mongoose from "mongoose";

// //profile schema
// const profileSchema = new mongoose.Schema({
//     profilePhoto: {
//         type: String,
//     },
//     username: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     email: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     age: {
//         type: Number,
//         required: true,
//     },
//     sex: {
//         type: String,
//         enum: ['male','female'],
//         required: true,
//     },
//     phone: {
//         type: String,
//         required: true,
//     },
//     address: {
//         type: String,
//         required: true,
//     },
//     updatedAt: {
//         type: Date,
//     },
// });

// export default mongoose.model("Profile", profileSchema);