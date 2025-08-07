import express from "express";
import VoteModel from "../model/voteschema.js";

const router = express.Router();

// POST vote
router.post("/", async (req, res) => {
    const { fullName, destination, reason, tripPeriod, deviceId } = req.body;

    if (!fullName || !destination || !tripPeriod || !deviceId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Check by deviceId (one vote per device)
        const votedByDevice = await VoteModel.findOne({ deviceId });
        if (votedByDevice) {
            return res.status(400).json({ message: "You have already voted from this device." });
        }

        // Check by fullName case-insensitive (one vote per name)
        const votedByName = await VoteModel.findOne({
            fullName: { $regex: `^${fullName}$`, $options: "i" }, // case insensitive exact match
        });
        if (votedByName) {
            return res.status(400).json({ message: "This name has already voted." });
        }

        // Save new vote
        const newVote = new VoteModel({ fullName, destination, reason, tripPeriod, deviceId });
        await newVote.save();

        res.status(201).json({ message: "Vote submitted successfully!" });
    } catch (error) {
        console.error("Error saving vote:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// GET results grouped by destination
router.get("/results", async (req, res) => {
    try {
        const results = await VoteModel.aggregate([
            { $group: { _id: "$destination", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        res.json(results);
    } catch (error) {
        console.error("Error fetching results:", error);
        res.status(500).json({ message: "Error fetching results", error: error.message });
    }
});

// NEW ROUTE: GET stats with total + each destination count
router.get("/stats", async (req, res) => {
    try {
        const totalVotes = await VoteModel.countDocuments();
        const thailandCount = await VoteModel.countDocuments({ destination: "Thailand" });
        const manaliCount = await VoteModel.countDocuments({ destination: "Manali" });
        const goaCount = await VoteModel.countDocuments({ destination: "Goa" });

        res.json({
            total: totalVotes,
            thailand: thailandCount,
            manali: manaliCount,
            goa: goaCount,
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Error fetching stats", error: error.message });
    }
});

// GET all votes (sorted newest first)
router.get("/all", async (req, res) => {
    try {
        const votes = await VoteModel.find().sort({ createdAt: -1 });
        res.json(votes);
    } catch (error) {
        console.error("Error fetching all votes:", error);
        res.status(500).json({ message: "Error fetching all votes", error: error.message });
    }
});

export default router;
