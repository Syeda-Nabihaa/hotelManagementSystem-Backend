import express, { Router } from "express";
import {
  getAllUser,
  getProfile,
  getUserbyid,
  login,
  signUp,
  updateUser,
} from "../Controllers/UserController.mjs";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../Controllers/RoomController.mjs";
import {
  cancelBooking,
  confirmBooking,
  createBooking,
  getAllBookings,
  getAllUserBookings,
  getBookingbyid,
} from "../Controllers/BookingController.mjs";
import { auth } from "../middlewares/auth.mjs";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
} from "../Controllers/FeedbackController.mjs";
import { verifyToken } from "../middlewares/verifyToken.mjs";
import uploads from "../utils/upload.mjs";
import {
  ContactInfo,
  getAllInfo,
  getInfoById,
  updateInfo,
} from "../Controllers/ContactController.mjs";
import { AboutInfo, getAllContent } from "../Controllers/AboutController.mjs";

const router = express.Router();

//-------------------- USER ROUTES -----------------------------
router.post("/signup", signUp);
router.post("/login", login);
router.get("/users", auth, getAllUser);
router.get("/user/:id", getUserbyid);
router.get("/profile", verifyToken, getProfile);
router.put("/update", verifyToken, updateUser);

//------------------- ROOMS ROUTES -----------------------------
router
  .post("/createroom", auth, uploads.array("ImageUrl"), createRoom)
  .get("/rooms", getAllRooms)
  .get("/room/:id", getRoomById)
  .put("/room/:id", auth, uploads.array("ImageUrl"), updateRoom)
  .delete("/room/:id", auth, deleteRoom);

//----------------- BOOKING ROUTES -------------------------------
router
  .post("/createbooking", auth, createBooking)
  .put("/confirmbooking/:id", auth, confirmBooking)
  .get("/userbooking", auth, getAllUserBookings)
  .get("/bookings", getAllBookings)
  .get("/booking/:id", auth, getBookingbyid)

  .delete("/cancelbooking/:id", auth, cancelBooking);

//-----------FEEDBACKROUTES------------------------------

router
  .post("/createfeedback", auth, createFeedback)
  .get("/feedbacks", getAllFeedback)
  .delete("/feedback/:id", deleteFeedback);

// ----------------------- CONTACT ROUTES ---------------------------------
router
  .post("/addinfo", ContactInfo)
  .get("/info", getAllInfo)
  .get("/info/:id", getInfoById)
  .put("/info/:id", updateInfo);

  //---------------------ABOUT ROUTES ---------------------------------------
  router
  .post("/add", AboutInfo)
  .get("/allcontent", getAllContent)
 
export default router;
