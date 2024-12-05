const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");
    } catch (err) {
        console.log("Connection error")
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
