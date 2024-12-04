const Course = require("../models/Course");
const Content = require('../models/Content');


// Create a new course
const createCourse = async (req, res) => {
    const { title, description, difficultyLevel, whatYoullLearn, content } = req.body;
    const instructor = req.userId; // Assumes user ID comes from auth middleware
    const thumbnail = req.file?.path; // File path from multer

    try {
        // First, process and save the content array as separate Content documents
        const contentIds = [];

        // Parse the content array from the request body
        const parsedContent = JSON.parse(content);

        // Loop through each content item and save it as a separate document
        for (const item of parsedContent) {
            const newContent = new Content({
                title: item.title,
                type: item.type,
                videoUrl: item.videoUrl,
                thumbnail: item.thumbnail,
                description: item.description,
            });

            // Save the content item and push its ObjectId to contentIds
            const savedContent = await newContent.save();
            contentIds.push(savedContent._id);
        }

        // Now, create the course and reference the content ObjectIds
        const newCourse = new Course({
            title,
            description,
            difficultyLevel,
            instructor,
            thumbnail, // Save the uploaded file path
            whatYoullLearn: JSON.parse(whatYoullLearn), // Parse whatYou'llLearn as array
            content: contentIds, // Reference the content by ObjectIds
        });

        // Save the new course document
        await newCourse.save();

        // Respond with success and the new course data
        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (err) {
        console.error("Error creating course:", err);
        // Handle errors and send appropriate response
        res.status(500).json({ error: err.message });
    }
};




// List all courses
const listCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("instructor", "username")
            .populate("content", "title type");
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ msg: "Error retrieving courses", error: err.message });
    }
};

// Get course by ID
const getCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId)
            .populate("instructor", "username")
            .populate("content", "title type description");
        if (!course) return res.status(404).json({ msg: "Course not found" });
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ msg: "Error retrieving course", error: err.message });
    }
};

// Update a course
const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const { title, description, content, whatYoullLearn, thumbnail, difficultyLevel } = req.body;
    const instructor = req.userId;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        if (course.instructor.toString() !== instructor) {
            return res.status(403).json({ msg: "Not authorized to update this course" });
        }

        // Update only provided fields
        course.title = title || course.title;
        course.description = description || course.description;
        course.content = content || course.content;
        course.whatYoullLearn = whatYoullLearn || course.whatYoullLearn;
        course.thumbnail = thumbnail || course.thumbnail;
        course.difficultyLevel = difficultyLevel || course.difficultyLevel;

        await course.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ msg: "Error updating course", error: err.message });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    const instructor = req.userId;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        if (course.instructor.toString() !== instructor) {
            return res.status(403).json({ msg: "Not authorized to delete this course" });
        }

        await course.deleteOne();
        res.status(200).json({ msg: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting course", error: err.message });
    }
};

// Enroll in a course
const enrollInCourse = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.userId;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        if (course.students.includes(studentId)) {
            return res.status(400).json({ msg: "Already enrolled in this course" });
        }

        course.students.push(studentId);
        await course.save();
        res.status(200).json({ msg: "Enrolled successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error enrolling in course", error: err.message });
    }
};

// Drop a course
const dropCourse = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.userId;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        if (!course.students.includes(studentId)) {
            return res.status(400).json({ msg: "Not enrolled in this course" });
        }

        course.students = course.students.filter(student => student.toString() !== studentId);
        await course.save();
        res.status(200).json({ msg: "Dropped successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error dropping course", error: err.message });
    }
};

module.exports = {
    createCourse,
    listCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    dropCourse,
};
