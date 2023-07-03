import Profile from "../models/profile.js"
import User from "../models/user.js";

//get profile information
export const getProfileDetails = async (req, res) => {
    try {
        console.log(req.user);
        const userId = req.user.userId;

        //find user by id and populate the username and email fields
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };

        //find the profile associated with the user
        const profile = await Profile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        };

        const profileData = {
            username: user.username,
            email: user.email,
            age: profile.age,
            sex: profile.sex,
            profilePhoto: profile.profilePhoto,
            phone: profile.phone,
            address: profile.address,
        };
        return res.status(200).json(profileData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
};

export const profileUpdate = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log(userId);
        console.log(req.body);
        const { age, sex, phone, address } = req.body;

        //Find the profile associated with the user
        const profile = await Profile.findOne({ user: userId });

        if (profile) {
            let updatedProfile = {
                age: profile.age,
                sex: profile.sex,
                profilePhoto: profile.profilePhoto,
                phone: profile.phone,
                address: profile.address,
            };
            //Handle profile photo upload
            if (req.file) {
                updatedProfile.profilePhoto = req.file.filename;
            }
            await profile.updateOne(updatedProfile, { _id: profile._id })
            return res.status(200).json(profile);
        };
        const newProfile = new Profile({
            age, sex, phone, address, user: userId,
        });
        //update the profile fields
        //Save the updated profile
        await newProfile.save();
        return res.status(200).json(newProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
};