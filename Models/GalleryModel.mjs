import mongoose from "mongoose";

const GalleryModel = new mongoose.Schema({
  ImageUrl: {
    type: String,
  },

  description: {
    type: String,
  },
});

export default mongoose.model("gallery", GalleryModel);
