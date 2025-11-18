import express from 'express'
import { login, signUp } from '../Controllers/UserController.mjs';

const router = express.Router();

//--------------------USER ROUTES -----------------------------
router.post('/signup' , signUp)
router.post('/login' , login)

export default router;