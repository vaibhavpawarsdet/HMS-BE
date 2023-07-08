import Profile from "../models/profile.js"
import User from "../models/user.js";

//get profile information
export const getProfileDetails = async (req, res) => {
    try {
        // console.log(req.user); 
        const userId = req.user.userId;

        //find user by id and populate the username and email fields
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };

        //find the profile associated with the user
        const profile = await Profile.findOne({ user: userId });

        if (!profile) {
            const profile = new Profile({
                user: userId,
                username: user.username,
                email: user.email,
                patientId: "",
                age: "",
                gender: "Male",
                phone: "",
                address: "",
                profilePhoto: "",
            });
            await profile.save();
            return res.status(200).json(profile);
            //return res.status(404).json({ message: "Profile not found" });
        };
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
};

export const profileUpdate = async (req, res) => {
    try {
        const userId = req.user.userId;
        //console.log(userId);
        //console.log(req.body);

        const { patientId, age, gender, phone, address } = req.body;

        //Find the profile associated with the user
        const profile = await Profile.findOne({ user: userId });
        //console.log(profile);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        let updatedProfile = {
            patientId: patientId || profile.patientId,
            age: age || profile.age,
            gender: gender || profile.gender,
            phone: phone || profile.phone,
            address: address || profile.address,
        };
        //Handle profile photo upload
        if (req.file) {
            updatedProfile.profilePhoto = req.file.filename;
        }
        await profile.updateOne(updatedProfile, { _id: profile._id })
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    };
}; 