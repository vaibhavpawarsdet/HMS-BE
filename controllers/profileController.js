import Profile from "../models/profile.js";

//get profile information
export const profileDetails = async (req, res) => {
    try {
        const userId = req.user.userId;
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        };
        return res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
};

export const profileUpdate = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {age, sex, profilePhoto, phone, address } = req.body;

        const profile = await Profile.findOneAndUpdate({ user: userId }, { age, sex, profilePhoto, phone, address }, { new: true });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        };

        return res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
};