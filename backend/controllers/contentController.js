const Content = require("../models/Content");

// Create new content
const createContent = async (req, res) => {
    const { title, videoUrl, type, description, thumbnail } = req.body;

    try {
        const newContent = new Content({ title, videoUrl, type, description, thumbnail });
        await newContent.save();
        res.status(201).json(newContent);
    } catch (err) {
        res.status(500).json({ msg: "Error creating content", error: err.message });
    }
};

// List all content
const listContent = async (req, res) => {
    try {
        const contentItems = await Content.find();
        res.status(200).json(contentItems);
    } catch (err) {
        res.status(500).json({ msg: "Error retrieving content", error: err.message });
    }
};

// Get content by ID
const getContentById = async (req, res) => {
    const { contentId } = req.params;

    try {
        const content = await Content.findById(contentId);
        if (!content) return res.status(404).json({ msg: "Content not found" });
        res.status(200).json(content);
    } catch (err) {
        res.status(500).json({ msg: "Error retrieving content", error: err.message });
    }
};

// Update content by ID
const updateContent = async (req, res) => {
    const { contentId } = req.params;
    const { title, videoUrl, type, description, thumbnail } = req.body;

    try {
        const content = await Content.findById(contentId);
        if (!content) return res.status(404).json({ msg: "Content not found" });

        // Update only provided fields
        content.title = title || content.title;
        content.videoUrl = videoUrl || content.videoUrl;
        content.type = type || content.type;
        content.description = description || content.description;
        content.thumbnail = thumbnail || content.thumbnail;

        await content.save();
        res.status(200).json(content);
    } catch (err) {
        res.status(500).json({ msg: "Error updating content", error: err.message });
    }
};

// Delete content by ID
const deleteContent = async (req, res) => {
    const { contentId } = req.params;

    try {
        const content = await Content.findById(contentId);
        if (!content) return res.status(404).json({ msg: "Content not found" });

        await content.deleteOne();
        res.status(200).json({ msg: "Content deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting content", error: err.message });
    }
};

module.exports = {
    createContent,
    listContent,
    getContentById,
    updateContent,
    deleteContent,
};
