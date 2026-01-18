const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        fileName: { type: String },
        public_id: { type: String, required: true }, // Cloudinary ID
        url: { type: String, required: true },        // Cloudinary URL
        semester: { type: String, required: true },   // e.g., "sem1", "sem2"
        subject: { type: String, required: true },    // e.g., "Python", "DBMS"
    },
    { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
