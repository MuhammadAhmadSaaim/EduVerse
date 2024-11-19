const express = require("express");
const {
    createContent,
    listContent,
    getContentById,
    updateContent,
    deleteContent
} = require("../controllers/contentController");
const auth = require("../middleware/auth");

const router = express.Router();

// Create new content
router.post("/create", auth, createContent);

// List all content
router.get("/", auth, listContent);

// Get content by ID
router.get("/:contentId", auth, getContentById);

// Update content by ID
router.put("/:contentId", auth, updateContent);

// Delete content by ID
router.delete("/:contentId", auth, deleteContent);

module.exports = router;
