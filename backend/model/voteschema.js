import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    destination: { type: String, required: true },
    reason: { type: String },
    tripPeriod: { type: String, required: true },
    deviceId: { type: String, required: true, unique: true },
}, { timestamps: true });

const VoteModel = mongoose.model("Vote", voteSchema);

export default VoteModel;
