import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import voteRoutes from "./routes/vote.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
}));
app.use(express.json());

app.use("/api/vote", voteRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Trip Vote API");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
