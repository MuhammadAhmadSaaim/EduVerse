const Course = require("../models/Course");

// Create a new course
const createCourse = async (req, res) => {
    const { title, description, content, whatYoullLearn, thumbnail } = req.body;
    const instructor = req.userId; // From JWT token

    try {
        const newCourse = new Course({ title, description, content, instructor, whatYoullLearn, thumbnail });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};


// List all courses
const listCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "username");
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Get course by ID
const getCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate("instructor", "username");
        if (!course) return res.status(404).json({ msg: "Course not found" });
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Update a course
const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const { title, description, content, whatYoullLearn, thumbnail } = req.body;
    const instructor = req.userId; // From JWT token

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        // Ensure the user is the instructor who created the course
        if (course.instructor.toString() !== instructor) {
            return res.status(403).json({ msg: "You are not authorized to update this course" });
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.content = content || course.content;
        course.whatYoullLearn = whatYoullLearn || course.whatYoullLearn;
        course.thumbnail = thumbnail || course.thumbnail;

        await course.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};


// Delete a course
const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    const instructor = req.userId; // From JWT token

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        // Ensure the user is the instructor who created the course
        if (course.instructor.toString() !== instructor) {
            return res.status(403).json({ msg: "You are not authorized to delete this course" });
        }

        await course.remove();
        res.status(200).json({ msg: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Enroll in a course
const enrollInCourse = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.userId; // From JWT token

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        if (course.students.includes(studentId)) {
            return res.status(400).json({ msg: "You are already enrolled in this course" });
        }

        course.students.push(studentId);
        await course.save();
        res.status(200).json({ msg: "You have successfully enrolled in the course" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Drop a course
const dropCourse = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.userId; // From JWT token

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        if (!course.students.includes(studentId)) {
            return res.status(400).json({ msg: "You are not enrolled in this course" });
        }

        course.students = course.students.filter(student => student.toString() !== studentId);
        await course.save();
        res.status(200).json({ msg: "You have successfully dropped the course" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    createCourse,
    listCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    dropCourse
};
