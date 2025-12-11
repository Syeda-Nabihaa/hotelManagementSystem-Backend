import mongoose from "mongoose";

const AboutContent = new mongoose.Schema({

  amenities: {
    type: String,
  },

  coreValues: {
    title: { type: String },
    description: { type: String },
  },
});

export default mongoose.model("AboutContent", AboutContent);
