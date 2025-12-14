import mongoose from "mongoose";

const ContactUsInfoSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ContactUs", ContactUsInfoSchema);
