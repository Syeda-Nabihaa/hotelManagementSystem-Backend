import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  guest: { type: Schema.Types.ObjectId, ref: "user"},
  room: { type: Schema.Types.ObjectId, ref: "rooms", required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "checked-in", "checked-out", "cancelled" , "confirmed"], default: "pending" },
  totalAmount: { type: Number, required: true },
   cancellationReason: {
    type: String,
    default: null,
  },
}, { timestamps: true });

export default model("booking", bookingSchema);
