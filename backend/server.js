const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express(); // ✅ THIS LINE WAS MISSING

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

app.use("/api/notes", require("./routes/notes"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/research", require("./routes/research"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
