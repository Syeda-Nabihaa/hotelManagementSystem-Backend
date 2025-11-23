import express from "express";
import { login, signUp } from "../Controllers/UserController.mjs";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../Controllers/RoomController.mjs";
import { cancelBooking, createBooking, getAllBookings } from "../Controllers/BookingController.mjs";
import { auth } from "../middlewares/auth.mjs";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
} from "../Controllers/FeedbackController.mjs";

const router = express.Router();

//-------------------- USER ROUTES -----------------------------
router.post("/signup", signUp);
router.post("/login", login);

//------------------- ROOMS ROUTES -----------------------------
router
  .post("/createroom", auth, createRoom)
  .get("/rooms", getAllRooms)
  .get("/room/:id", getRoomById)
  .post("/room/:id", auth, updateRoom)
  .delete("/room/:id", auth, deleteRoom);

//----------------- BOOKING ROUTES -------------------------------
router.post("/createbooking", auth, createBooking)
.get("/bookings", auth, getAllBookings)
.delete("/cancelbooking/:id", auth , cancelBooking)

//-----------FEEDBACKROUTES------------------------------

router
  .post("/createfeedback", auth, createFeedback)
  .get("/feedbacks", getAllFeedback)
  .delete("/feedback/:id", deleteFeedback)
export default router;
