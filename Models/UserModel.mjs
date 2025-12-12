import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: Number, required: true },
    city: { type: String },
    role: {
      type: String,
      enum: ["admin", "guest"],
      default:"guest"

    },
   
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);
