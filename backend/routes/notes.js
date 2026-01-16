const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const Note = require("../models/Note");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Convert buffer to base64
        const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataUri, {
            folder: "notes",
            resource_type: "auto",
        });

        // SAVE to MongoDB (THIS WAS MISSING / WRONG)
        const note = new Note({
            title: req.body.title || req.file.originalname,
            fileName: req.file.originalname,
            public_id: result.public_id,     // ✅ REQUIRED
            url: result.secure_url,           // ✅ REQUIRED
        });

        await note.save();

        res.status(201).json({
            message: "Note uploaded successfully",
            note,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed", error });
    }
});

module.exports = router;
