import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads folder if it doesn't exist
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

app.use(cors({
    origin: [
        "https://career-optimizer.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => res.send("Career Optimizer API running ✅"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));