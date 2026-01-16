const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const Project = require("../models/Project");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: "projects",
            resource_type: "auto",
        });

        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            fileUrl: result.secure_url,
            cloudinaryId: result.public_id,
        });

        await project.save();
        res.status(201).json({ message: "Project uploaded successfully", project });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
