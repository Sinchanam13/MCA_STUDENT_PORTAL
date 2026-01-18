const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const Research = require("../models/Research");
const axios = require("axios");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= UPLOAD RESEARCH =================
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "research",
                        resource_type: "raw",
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

        const research = new Research({
            title: req.body.title || req.file.originalname,
            description: req.body.description || "",
            fileUrl: result.secure_url,      // ✅ schema match
            cloudinaryId: result.public_id   // ✅ schema match
        });

        await research.save();

        res.status(201).json({
            message: "Research uploaded successfully",
            research
        });

    } catch (error) {
        console.error("Research upload error:", error);
        res.status(500).json({ message: "Upload failed", error });
    }
});

// ================= GET ALL RESEARCH =================
router.get("/all", async (req, res) => {
    try {
        const researches = await Research.find().sort({ createdAt: -1 });
        res.status(200).json(researches); // returns array like projects
    } catch (error) {
        console.error("Fetch research error:", error);
        res.status(500).json({ message: "Failed to fetch research" });
    }
});

// ================= DOWNLOAD RESEARCH =================
router.get("/download/:id", async (req, res) => {
    try {
        const research = await Research.findById(req.params.id);
        if (!research) return res.status(404).send("Research not found");

        const response = await axios({
            url: research.fileUrl,
            method: "GET",
            responseType: "stream"
        });

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${research.title}.pdf"`
        );

        response.data.pipe(res);

    } catch (err) {
        console.error("Download error:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
