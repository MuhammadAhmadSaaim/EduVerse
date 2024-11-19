const Content = require("../models/Content");

// Create new content
const createContent = async (req, res) => {
    const { title, videoUrl, duration, type, description } = req.body;

    try {
        const newContent = new Content({ title, videoUrl, duration, type, description });
        await newContent.save();
        res.status(201).json(newContent);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// List all content
const listContent = async (req, res) => {
    try {
        const contentItems = await Content.find();
        res.status(200).json(contentItems);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
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
        res.status(500).json({ msg: "Server error" });
    }
};

// Update content by ID
const updateContent = async (req, res) => {
    const { contentId } = req.params;
    const { title, videoUrl, duration, type, description } = req.body;

    try {
        const content = await Content.findById(contentId);
        if (!content) return res.status(404).json({ msg: "Content not found" });

        content.title = title || content.title;
        content.videoUrl = videoUrl || content.videoUrl;
        content.duration = duration || content.duration;
        content.type = type || content.type;
        content.description = description || content.description;

        await content.save();
        res.status(200).json(content);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Delete content by ID
const deleteContent = async (req, res) => {
    const { contentId } = req.params;

    try {
        const content = await Content.findById(contentId);
        if (!content) return res.status(404).json({ msg: "Content not found" });

        await content.remove();
        res.status(200).json({ msg: "Content deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    createContent,
    listContent,
    getContentById,
    updateContent,
    deleteContent
};
