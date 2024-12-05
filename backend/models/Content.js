const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: {
        type: String,
        required: function () {
            return this.type === "video"; // Only required if type is "video"
        }
    },
    thumbnail: {
        type: String,
        required: function () {
            return this.type === "video"; // Only required if type is "video"
        }
    },
    type: {
        type: String,
        enum: ["video", "quiz", "assignment"],
        default: "video"
    },
    description: { type: String }
});

module.exports = mongoose.model("Content", ContentSchema);
