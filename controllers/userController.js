import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Profile from "../models/profile.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        //check if email already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        };
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    };
};

export const login = async (req, res) => {
    try {
        const { email, username, role, password } = req.body;

        //Find user by email or username
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }],
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid email/username or password" });
        }

        //compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email/username or password" });
        };

        //Generate JWT token
        const token = jwt.sign({
            userId: user._id,
            role: user.role,
        }, "secretKey", { expiresIn: "10h" });

        return res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};