import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  guest: { type: Schema.Types.ObjectId, ref: "user"},
  room: { type: Schema.Types.ObjectId, ref: "rooms", required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  status: { type: String, enum: ["reserved", "checked-in", "checked-out", "cancelled"], default: "reserved" },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

export default model("booking", bookingSchema);
