import express from 'express';
import { signup, login } from '../controllers/user.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

console.log("✅ userRoutes loaded");

router.post("/signup", signup)
router.post("/login", login);


export default router;