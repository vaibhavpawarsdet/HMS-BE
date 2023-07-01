import Profile from "../models/profile.js";
import User from "../models/user.js";

//get profile information
export const getProfileDetails = async (req, res) => {
    try {
        const userId = req.user._id;

        //find user by id and populate the username and email fields
        const user = await User.findOne( userId, "username email");

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
        const userId = req.user._id;
        const {age, sex, phone, address } = req.body;

        //Find the profile associated with the user
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        };

        //update the profile fields
        profile.age = age;
        profile.sex = sex;
        profile.phone = phone;
        profile.address = address;

        //Handle profile photo upload
        if (req.file) {
            profile.profilePhoto = req.file.filename;
        }

        //Save the updated profile
        profile = await profile.save();

        //combine the updated profile data
        const updatedProfile = {
            age: profile.age,
            sex: profile.sex,
            profilePhoto: profile.profilePhoto,
            phone: profile.phone,
            address: profile.address,
        };

        return res.status(200).json(updatedProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
};

//For uploading profile photo
// export const uploadProfilePhoto = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         //find profile associate with the user
//         let profile = await Profile.findOne({ user: userId });

//         if (!profile) {
//             return res.status(404).json({ message: "Profile not found" });
//         }

//         //Save the uploaded profile photo filename to the profile
//         profile.profilePhoto = req.file.filename;
//         await profile.save();

//         return res.status(200).json({ message: "Profile photo uploaded successfully" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     };
// };