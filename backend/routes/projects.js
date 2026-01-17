const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const Project = require("../models/Project");
const streamifier = require("streamifier");

// Multer in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /projects/upload
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Function to upload via stream
        const uploadToCloudinary = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "projects", resource_type: "raw" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        // Upload file
        const result = await uploadToCloudinary(req.file.buffer);

        // Create new project in MongoDB
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            fileUrl: result.secure_url,     // ✅ required for validation
            cloudinaryId: result.public_id, // ✅ required for validation
        });

        await project.save();
        res.status(201).json({ message: "Project uploaded successfully", project });

    } catch (err) {
        console.error("Project upload error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
