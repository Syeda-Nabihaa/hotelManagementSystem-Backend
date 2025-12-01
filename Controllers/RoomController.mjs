import RoomModel from "../Models/RoomModel.mjs";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
const getImageUrl = (req, filename) => {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, amenities } = req.body;
    if (!roomNumber && !type && !price) {
      if (req.file) {
        await fs.unlink(path.join(__dirname, "../uploads", req.file.filename));
      }
      res.status(400).json({ message: "All fields are required" });
    }
    const existingRoom = await RoomModel.findOne({ roomNumber });
    if (existingRoom) {
      res.status(400).json({ message: "Room Already Exists" });
    }
    const ImageUrl = req.file ? getImageUrl(req, req.file.filename) : null;
    const newRoom = await RoomModel.create({
      roomNumber,
      type,
      price,
      amenities,
      ImageUrl,
    });
    res
      .status(200)
      .json({ message: "Room created successfully", data: newRoom });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
    const updates = req.body;
    const updateRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updateRoom) {
      res
        .status(200)
        .json({ message: "Room updated successfully", room: updateRoom });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
