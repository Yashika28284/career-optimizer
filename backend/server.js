import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => res.send("Career Optimizer API running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
