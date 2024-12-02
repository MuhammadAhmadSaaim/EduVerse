const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // const token = req.header("x-auth-token");
    const authHeader = req.header("Authorization");
    //console.log("Authorization Header:", req.header("Authorization"));



    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
    //console.log("Extracted Token:", token);

    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Add user ID to request object
        next();
    } catch (err) {
        res.status(400).json({ msg: "Token is not valid" });
    }
};

module.exports = auth;
