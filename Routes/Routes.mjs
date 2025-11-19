import express from 'express'
import { login, signUp } from '../Controllers/UserController.mjs';
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from '../Controllers/RoomController.mjs';

const router = express.Router();

//-------------------- USER ROUTES -----------------------------
router.post('/signup' , signUp)
router.post('/login' , login)


//------------------- ROOMS ROUTES -----------------------------
router.post('/createroom' , createRoom )
.get("/rooms" , getAllRooms)
.get("/room/:id", getRoomById)
.post("/room/:id", updateRoom)
.delete("/room/:id" , deleteRoom)
export default router;
