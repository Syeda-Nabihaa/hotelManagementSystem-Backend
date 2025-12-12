import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import GalleryModel from "../Models/GalleryModel.mjs";
const getImageUrl = (req, filename) => {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

export const uploadImages = async (req, res) => {
  try {
    const { description } = req.body;

    // Validation
    if (!description) {
      if (req.file ) {
        
          await fs.unlinkSync(path.join(__dirname, "../uploads", req.file.filename))
        
      }
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert uploaded files to URLs
    const ImageUrl = req.file ? getImageUrl(req, req.file.filename) : null;

    const gallery = await GalleryModel.create({
      description,
      ImageUrl,
    });

    return res.status(200).json({
      message: "Gallery created successfully",
      data: gallery,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
export const getAllImages = async (req, res) => {
  try {
    const gallery = await GalleryModel.find();
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
