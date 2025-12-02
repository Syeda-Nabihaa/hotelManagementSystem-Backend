import mongoose from "mongoose";

const RoomSChema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    floor: { type: Number },
    maxGuests: { type: Number, default: 2 },
    mealPlan: {
      type: String,
      enum: ["room_only", "breakfast_only", "half_board", "full_board"],
      default: "room_only",
    },

    mealPlanDescription: {
      type: String,
      default: "No meals included with the room booking.",
    },

    type: { type: String, enum: ["single", "double"], required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "occupied", "cleaning", "maintenance"],
      default: "available",
    },
    amenities: [{ type: String }], // optional: ["AC", "TV", "WiFi"]
    ImageUrl: [String],
  },
  { timestamps: true }
);

export default mongoose.model("rooms", RoomSChema);
// "Private bathroom", "One large bed", free Wi-Fi access