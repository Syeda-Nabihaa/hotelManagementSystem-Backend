import mongoose from "mongoose";

const ContactInfoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
    value:{type:String},
  icon: { type: String, required: true },
});

export default mongoose.model("ContactInfo", ContactInfoSchema);
