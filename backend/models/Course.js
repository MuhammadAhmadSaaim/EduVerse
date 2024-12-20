const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    difficultyLevel: { type: String, enum: ["easy", "medium", "hard"], required: true },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }], // Array of references to Content documents
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    whatYoullLearn: [{ type: String }],
    thumbnail: { type: String },
    progress: [
        {
            student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            completedContentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
            remainingContentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }]
        }
    ]
});

module.exports = mongoose.model("Course", CourseSchema);
