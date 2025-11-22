import mongoose, { Schema } from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  guest: { type: Schema.Types.ObjectId, ref: "user" },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("feedback", FeedbackSchema);
