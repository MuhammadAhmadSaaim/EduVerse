const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
    const { email, password, role, username, profilePhoto, hobbies } = req.body;
    console.log(req.body);
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false,msg: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            username,
            profilePhoto,
            hobbies,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "8h" });
        res.status(201).json({ success: true, token, user: newUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false,msg: "Server error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "8h" });
        res.status(200).json({ success: true,data:{token, role: user.role} });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { registerUser, loginUser };
