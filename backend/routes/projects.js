const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const Project = require("../models/Project");
const axios = require("axios");

const storage = multer.memoryStorage();
const upload = multer({ storage });


// ================= UPLOAD PROJECT =================
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "projects",
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

        const project = new Project({
            title: req.body.title || req.file.originalname,
            description: req.body.description || "",
            fileUrl: result.secure_url,      // ✅ schema match
            cloudinaryId: result.public_id   // ✅ schema match
        });

        await project.save();

        res.status(201).json({
            message: "Project uploaded successfully",
            project
        });

    } catch (error) {
        console.error("Project upload error:", error);
        res.status(500).json({ message: "Upload failed", error });
    }
});


// ================= GET ALL PROJECTS =================
router.get("/all", async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects" });
    }
});


// ================= DOWNLOAD PROJECT =================
router.get("/download/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send("Project not found");

        const response = await axios({
            url: project.fileUrl,
            method: "GET",
            responseType: "stream"
        });

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${project.title}.pdf"`
        );

        response.data.pipe(res);

    } catch (err) {
        console.error("Download error:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
