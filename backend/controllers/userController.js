const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        //console.log("Decoded User ID:", req.userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(user);


    }catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
}


const updateProfile = async (req, res) => {
    const { username, email, password, profilePhoto,hobbies } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ msg: "User not found" });
        // Update user profile

        user.username = username || user.username;
        user.email = email || user.email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        if (profilePhoto ) {
            const uploadedResponse = await cloudinary.uploader.upload(profilePhoto);
				pic = uploadedResponse.secure_url;
        }
        // console.log(profilePhoto);
        user.profilePhoto = profilePhoto || user.profilePhoto;
        user.hobbies = hobbies || user.hobbies;

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ msg: "Server error" });
    }
}


module.exports = { getUserProfile, updateProfile};

