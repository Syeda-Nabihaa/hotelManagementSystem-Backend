import RoomModel from "../Models/RoomModel.mjs";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
const getImageUrl = (req, filename) => {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, amenities, description, mealPlan , floor , maxGuests} = req.body;

    // Validation
    if (!roomNumber || !type || !price || !description) {
      if (req.files && req.files.length > 0) {
        req.files.forEach(file =>
          fs.unlinkSync(path.join(__dirname, "../uploads", file.filename))
        );
      }
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingRoom = await RoomModel.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ message: "Room Already Exists" });
    }

    // Convert uploaded files to URLs
    const ImageUrl = req.files
      ? req.files.map(file => getImageUrl(req, file.filename))
      : [];

    // Meal plan descriptions
    const mealDescriptions = {
      room_only: "No meals included with the room booking.",
      breakfast_only: "Complimentary breakfast included.",
      half_board: "Breakfast and dinner included.",
      full_board: "Complete 3-time meal: breakfast, lunch, and dinner included."
    };

    const newRoom = await RoomModel.create({
      roomNumber,
      floor,
      maxGuests,
      type,
      price,
      amenities,
      description,
      ImageUrl,
      mealPlan: mealPlan || "room_only", // default if not provided
      mealPlanDescription: mealDescriptions[mealPlan] || mealDescriptions["room_only"]
    });

    return res.status(200).json({
      message: "Room created successfully",
      data: newRoom
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await RoomModel.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    } 

    // Update normal fields
    Object.assign(room, req.body);

    // If new images uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => getImageUrl(req, file.filename));

      // ▶ MERGE (keep old + add new)
      room.ImageUrl = [...room.ImageUrl, ...newImages];
    }

    await room.save();

    return res.status(200).json({
      message: "Room updated successfully",
      room,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const deleteRoom = async (req, res) => {
  try {
    const deleteRoom = await RoomModel.findByIdAndDelete(req.params.id);
    if (!deleteRoom) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
