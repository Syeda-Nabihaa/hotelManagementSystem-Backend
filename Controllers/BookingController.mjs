import BookingModel from "../Models/BookingModel.mjs";
import RoomModel from "../Models/RoomModel.mjs";
import UserModel from "../Models/UserModel.mjs";

export const createBooking = async (req, res) => {
  try {
    const { guest, room, checkInDate, checkOutDate } = req.body;
    if (!room || !checkInDate || !checkOutDate) {
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

    // if (availableRoom.status !== "available") {
    //   return res.status(400).json({
    //     message: `Room is currently ${availableRoom.status}`,
    //   });
    // }

    const existingBooking = await BookingModel.findOne({
      room,
      status: { $in: ["reserved", "checked-in"] },
      checkInDate: { $lt: checkOut },
      checkOutDate: { $gt: checkIn },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Room is already booked for the selected dates",
      });
    }

    const totalDays = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalAmount = totalDays * availableRoom.price;
    const booking = await BookingModel.create({
      guest: req.user.id,
      room,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalAmount,
      status: "reserved",
    });
    availableRoom.status = "occupied";
    await availableRoom.save();
    res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUserBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find({ guest: req.user.id })
      .populate("room") // <-- this loads full room data
      .sort({ createdAt: -1 });
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    } else {
      return res.status(200).json(bookings);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate("room")
      .populate("guest")
      .sort({ createdAt: -1 });
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    } else {
      return res.status(200).json(bookings);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const cancelBooking = async (req, res) => {
  try {
    const id = req.params.id;

    // Get cancellation reason from request body
    const { reason } = req.body;

    if (!reason || reason.trim() === "") {
      return res.status(400).json({
        message: "Cancellation reason is required",
      });
    }

    const booking = await BookingModel.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
    }

    // Prevent cancelling checked-in booking
    if (booking.status === "checked-in") {
      return res.status(400).json({
        message: "Booking cannot be cancelled after check-in",
      });
    }

    // Guests can cancel only their own bookings
    if (req.user.role === "guest") {
      if (booking.guest.toString() !== req.user.id) {
        return res.status(403).json({
          message: "You can cancel only your own bookings",
        });
      }
    }

    // Step 1: Cancel booking + add reason
    booking.status = "cancelled";
    booking.cancellationReason = reason;
    await booking.save();

    // Step 2: Update room status
    if (booking.room) {
      const updated = await RoomModel.updateOne(
        { _id: booking.room },
        { $set: { status: "available" } }
      );

      console.log("ROOM UPDATE RESULT:", updated);
    }

    // Step 3: Notify guest if admin cancels
    if (req.user.role === "admin") {
      const user = await UserModel.findById(booking.guest);
      console.log(`Notification sent to user: ${user.email}`);
    }

    res.status(200).json({
      message: "Booking cancelled successfully and room status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getBookingbyid = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await BookingModel.findById(id)
      .populate("room")
      .populate("guest")
      .sort({ createdAt: -1 });
    if (!booking) {
      return res.status(404).json({ message: "no booking found" });
    }
    return res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//  const bookings = await BookingModel
//       .find({ guest: req.user.id })
//       .populate("room")   // <-- this loads full room data
//       .sort({ createdAt: -1 });
