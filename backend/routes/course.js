const express = require("express");
const { createCourse, listCourses, getCourse, updateCourse, deleteCourse, enrollInCourse, dropCourse, getRecommendations } = require("../controllers/courseController");
const auth = require("../middleware/auth");

const router = express.Router();

// Create a new course
router.post("/create", auth, createCourse);

// List all courses
router.get("/", listCourses);

// Get course by ID
router.get("/:courseId", getCourse);

// Update course by ID
router.put("/:courseId", auth, updateCourse);

// Delete course by ID
router.delete("/:courseId", auth, deleteCourse);

// Enroll in a course
router.post("/enroll/:courseId", auth, enrollInCourse);

// Drop a course
router.post("/drop/:courseId", auth, dropCourse);

router.post("/recommendations", auth, getRecommendations);

module.exports = router;
