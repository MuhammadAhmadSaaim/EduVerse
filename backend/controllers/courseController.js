const dotenv = require("dotenv");
dotenv.config();
const Course = require("../models/Course");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
const express = require("express");
const app=express();
app.use(express.json()); // Parse JSON body


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

const getRecommendations = async (req, res) => {
    const { hobbies } = req.body; // Capture hobbies from the request
    // console.log(hobbies)
    // console.log("Received hobbies:", hobbies);
    const geminiApiKey = process.env.GOOGLE_API_KEY;
    // console.log("Gemini API Key:", geminiApiKey);

    try {
        const genAI = await new GoogleGenerativeAI(geminiApiKey);
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const hobbiesnew = hobbies.join(",");
        const prompt = `Suggest 3 subjects related to ${hobbiesnew}. Only give me names separated by commas. Nothing else.`
        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        let textArray = text.split(",");
        // console.log(text)
        res.status(200).json(textArray);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
}




module.exports = {
    createCourse,
    listCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    dropCourse,
    getRecommendations,
};
