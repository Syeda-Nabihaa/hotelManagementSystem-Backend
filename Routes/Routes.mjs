import express from 'express'
import { signUp } from '../Controllers/UserController.mjs';

const router = express.Router();

//--------------------USER ROUTES -----------------------------
router.post('/signup' , signUp)

export default router;