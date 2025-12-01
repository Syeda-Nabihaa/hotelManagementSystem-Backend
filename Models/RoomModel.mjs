import mongoose from "mongoose";

const RoomSChema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ["single", "double"], required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "occupied", "cleaning", "maintenance"],
      default: "available",
    },
    amenities: [{ type: String }], // optional: ["AC", "TV", "WiFi"]
    ImageUrl :{
      type:String
    }
  },
  { timestamps: true }
);


export default mongoose.model('rooms' , RoomSChema)