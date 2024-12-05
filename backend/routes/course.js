const express = require("express");

const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const {
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

} = require("../controllers/courseController");

const router = express.Router();

// Multer setup to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where the file will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Creating a unique filename
  },
});

const upload = multer({ storage: storage });

// Create a new course
router.post("/create", auth, upload.single("thumbnail"), createCourse);

router.get("/", listCourses);

// Get course by ID
router.get("/:courseId", getCourse);
router.get("/course-detail/:courseId", getCourseDetail);
// router.get("/enrolled-course-detail/:courseId", auth, getEnrolledCourseDetail);
router.get("/enrolled-course/:courseId", getEnrolledCourse);





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
