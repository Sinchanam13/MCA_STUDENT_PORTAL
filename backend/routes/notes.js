const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const Note = require("../models/Note");
const axios = require("axios");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= UPLOAD NOTE =================
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "notes",
                        resource_type: "raw",
                        timeout: 120000
                    },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(req.file.buffer);
            });
        };

        const result = await streamUpload();

        const note = new Note({
            title: req.body.title || req.file.originalname,
            fileName: req.file.originalname,
            public_id: result.public_id,
            url: result.secure_url
        });

        await note.save();

        res.status(201).json({
            message: "Note uploaded successfully",
            note
        });

    } catch (error) {
        console.error("Notes upload error:", error);
        res.status(500).json({ message: "Upload failed", error });
    }
});

// ================= GET ALL NOTES =================
router.get("/all", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notes", error });
    }
});

// ================= DOWNLOAD NOTE =================
router.get("/download/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Note not found");

        // Fetch file from Cloudinary
        const response = await axios({
            url: note.url,
            method: "GET",
            responseType: "stream"
        });

        // Set original filename for download
        res.setHeader("Content-Disposition", `attachment; filename="${note.fileName}"`);

        // Stream file to client
        response.data.pipe(res);

    } catch (err) {
        console.error("Download error:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
