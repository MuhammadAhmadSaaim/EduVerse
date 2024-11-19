const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true }, // URL or path to the video
    duration: { type: Number }, // Optional: length of the content in minutes
    type: { type: String, enum: ["video", "quiz", "assignment"], default: "video" }, // Content type
    description: { type: String } // Optional: brief description of the content
});

module.exports = mongoose.model("Content", ContentSchema);
