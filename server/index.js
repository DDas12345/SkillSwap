import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to SkillSwap Campus API!");
});

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to SkillSwap Campus!",
        project: "SkillSwap Campus",
        version: "1.0.0"
    });
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});