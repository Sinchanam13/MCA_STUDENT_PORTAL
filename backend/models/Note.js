const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
