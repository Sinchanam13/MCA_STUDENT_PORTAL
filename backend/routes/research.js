const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../cloudinaryConfig");
const Research = require("../models/Research");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: "research",
            resource_type: "raw",
        });

        const research = new Research({
            title: req.body.title,
            description: req.body.description,
            fileUrl: result.secure_url,
            cloudinaryId: result.public_id,
        });

        await research.save();

        res.status(201).json({
            message: "Research paper uploaded successfully",
            research,
        });

    } catch (error) {
        console.error("Research upload error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
