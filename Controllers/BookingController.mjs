import BookingModel from "../Models/BookingModel.mjs";
import RoomModel from "../Models/RoomModel.mjs";

export const createBooking = async (req, res) => {
  try {
    const { guest, room, checkInDate, checkOutDate } = req.body;
    if (!guest || !room || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        message: "All Fields are required",
      });
    }
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();

    if (checkIn >= checkOut) {
      return res.status(400).json({
        message: "Check-out date must be after check-in date",
      });
    }
    if (checkIn < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({
        message: "Check-in date cannot be in the past",
      });
    }

    const availableRoom = await RoomModel.findById(room);
    if (!availableRoom) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    if (availableRoom.status !== "available") {
      return res.status(400).json({
        message: `Room is currently ${availableRoom.status}`,
      });
    }

    const existingBooking = await BookingModel.findOne({
      room,
      $or: [
        {
          checkInDate: { $lte: checkOut },
          checkOutDate: { $gte: checkIn },
          status: { $in: ["confirmed", "checked-in"] },
        },
      ],
    });
    if (existingBooking) {
      return res.status(400).json({
        message: "Room is already booked for the selected dates",
      });
    }
    const totalDays = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalAmount = totalDays * availableRoom.price;
        const booking = await BookingModel.create({
      guest,
      room,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalAmount,
      status: 'reserved'
    });
     availableRoom.status = "occupied";
    await roomDoc.save();
     res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
