const dotenv = require("dotenv");
dotenv.config();
const Course = require("../models/Course");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.json()); // Parse JSON body

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
            .select("title description thumbnail students instructor content difficultyLevel") // Include content to calculate the count
            .populate("instructor", "username"); // Populate instructor name

        const formattedCourses = await Promise.all(
            courses.map(async (course) => {
                // Count content length accurately by checking the Content model
                const contentCount = await Content.countDocuments({ _id: { $in: course.content } });

                return {
                    id: course._id, // Include the course ID for navigation
                    title: course.title,
                    description: course.description,
                    thumbnail: course.thumbnail,
                    studentCount: course.students.length, // Total number of students
                    instructor: course.instructor?.username, // Instructor's name
                    contentCount: course.content.length, // Accurate total number of content items
                    students: course.students,
                    difficultyLevel: course.difficultyLevel,
                };
            })
        );

        res.status(200).json(formattedCourses);
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
            .populate("content", "title videoUrl type description thumbnail")
            .populate("students", "username email role"); // Populate student details

        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        const courseDetails = {
            title: course.title,
            description: course.description,
            instructor: course.instructor.username,
            thumbnail: course.thumbnail,
            difficultyLevel: course.difficultyLevel,
            whatYoullLearn: course.whatYoullLearn,
            students: course.students, // Return the students array with details
            content: course.content, // Return all content in the course
        };

        res.status(200).json(courseDetails);
    } catch (err) {
        res.status(500).json({ msg: "Error retrieving course", error: err.message });
    }
};

// Get course detail by ID (FOR STUDENT "NEW COURSE")
const getCourseDetail = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId)
            .populate("instructor", "username")
            .populate("content", "title videoUrl type description thumbnail")
            .populate("students", "username email role");

        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        // Format the response to match the frontend needs
        const courseDetails = {
            id: course._id,
            title: course.title,
            description: course.description,
            instructor: {
                name: course.instructor.username,
            },
            thumbnail: course.thumbnail,
            difficultyLevel: course.difficultyLevel,
            whatYoullLearn: course.whatYoullLearn || [],
            content: course.content.map(item => ({
                id: item._id,
                title: item.title,
                videoUrl: item.videoUrl,
            })),
            students: course.students.map(student => ({
                id: student._id,
                name: student.username,
            })),
            studentCount: course.students.length, // Add student count
        };

        res.status(200).json(courseDetails);
    } catch (err) {
        res.status(500).json({ msg: "Error retrieving course details", error: err.message });
    }
};

// Get course detail by id (FOR STUDENT "MY COURSE")
const getEnrolledCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId)
            .populate("instructor", "username")
            .populate("content", "title videoUrl type description thumbnail")
            .populate("students", "username email role");

        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        const enrolledCourseDetails = {
            id: course._id,
            title: course.title,
            description: course.description,
            instructor: {
                name: course.instructor.username,
            },
            thumbnail: course.thumbnail,
            difficultyLevel: course.difficultyLevel,
            whatYoullLearn: course.whatYoullLearn || [],
            content: course.content.map(item => ({
                id: item._id,
                title: item.title,
                videoUrl: item.videoUrl,
            })),
            students: course.students.map(student => ({
                id: student._id,
                name: student.username,
            })),
        };

        res.status(200).json(enrolledCourseDetails);
    } catch (err) {
        res.status(500).json({ msg: "Error retrieving enrolled course details", error: err.message });
    }
};


// Update a course
const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const { title, description, content, whatYoullLearn, thumbnail, difficultyLevel, updatedContent } = req.body;
    const instructor = req.userId;

    try {
        // Find the course to update
        const course = await Course.findById(courseId).populate("content");
        if (!course) return res.status(404).json({ msg: "Course not found" });

        // Ensure only the instructor can update the course
        if (course.instructor.toString() !== instructor) {
            return res.status(403).json({ msg: "Not authorized to update this course" });
        }

        // Update course fields if provided
        if (title) course.title = title;
        if (description) course.description = description;
        if (whatYoullLearn) course.whatYoullLearn = whatYoullLearn;
        if (thumbnail) course.thumbnail = thumbnail;
        if (difficultyLevel) course.difficultyLevel = difficultyLevel;

        // Handle content updates
        if (updatedContent) {
            // Validate and update existing content items
            for (const updated of updatedContent) {
                const { contentId, ...updates } = updated;

                // Find the content to update
                const existingContent = await Content.findById(contentId);
                if (!existingContent) {
                    return res.status(404).json({ msg: `Content with ID ${contentId} not found` });
                }

                // Update only provided fields
                Object.keys(updates).forEach((key) => {
                    if (updates[key] !== undefined) existingContent[key] = updates[key];
                });

                // Save the updated content
                await existingContent.save();
            }
        }

        // Replace course content if new content array is provided
        if (content) {
            const validContent = await Content.find({ _id: { $in: content } });
            if (validContent.length !== content.length) {
                return res.status(400).json({ msg: "One or more content items not found" });
            }
            course.content = content;
        }

        // Save the course updates
        await course.save();

        res.status(200).json({ msg: "Course updated successfully", course });
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

        // Delete all associated content
        if (course.content && course.content.length > 0) {
            await Content.deleteMany({ _id: { $in: course.content } });
        }

        // Delete the course
        await course.deleteOne();
        res.status(200).json({ msg: "Course and its content deleted successfully" });
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

const getRecommendations = async (req, res) => {
    const { hobbies } = req.body; // Capture hobbies from the request
    // console.log(hobbies)
    // console.log("Received hobbies:", hobbies);
    const geminiApiKey = process.env.GOOGLE_API_KEY;
    // console.log("Gemini API Key:", geminiApiKey);
    if (hobbies) {
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
    } else {
        res.status(500).json({ error: "Failed to fetch recommendations because of no hobbies" });
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
    getCourseDetail,
    getEnrolledCourse,
};
