import mongoose from "mongoose";

export const connectWithDb = () => {
    mongoose.connect(
        process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log(`DB GOT CONNECTED`))
        .catch((error) => {
            console.log(`DB CONNECTION ISSUES`);
            console.log(error);
        });
};