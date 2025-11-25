import express from "express";
import { getAllUser, getProfile, getUserbyid, login, signUp } from "../Controllers/UserController.mjs";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../Controllers/RoomController.mjs";
import { cancelBooking, createBooking, getAllBookings, getBookingbyid } from "../Controllers/BookingController.mjs";
import { auth } from "../middlewares/auth.mjs";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
} from "../Controllers/FeedbackController.mjs";
import { verifyToken } from "../middlewares/verifyToken.mjs";

const router = express.Router();

//-------------------- USER ROUTES -----------------------------
router.post("/signup", signUp);
router.post("/login", login);
router.get("/users", getAllUser);
router.get("/user/:id", getUserbyid);
router.get("/profile",verifyToken, getProfile);

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
.get("/booking/:id", auth, getBookingbyid)

.delete("/cancelbooking/:id", auth , cancelBooking)

//-----------FEEDBACKROUTES------------------------------

router
  .post("/createfeedback", auth, createFeedback)
  .get("/feedbacks", getAllFeedback)
  .delete("/feedback/:id", deleteFeedback)
export default router;
