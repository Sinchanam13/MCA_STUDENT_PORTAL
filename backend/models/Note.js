const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        fileName: { type: String },
        public_id: { type: String, required: true }, // Cloudinary ID
        url: { type: String, required: true },        // Cloudinary URL
    },
    { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
