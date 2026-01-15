const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../cloudinaryConfig");
const Note = require("../models/Note");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: "notes",
            resource_type: "auto",
        });

        const newNote = new Note({
            title: req.body.title,
            description: req.body.description,
            fileUrl: result.secure_url,
            cloudinaryId: result.public_id,
        });

        await newNote.save();
        res.status(201).json({ message: "Note uploaded successfully", note: newNote });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
