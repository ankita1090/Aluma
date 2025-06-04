import express from 'express';
import { signup, } from '../controllers/user.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

console.log("✅ userRoutes loaded");

router.post("/signup", signup)



export default router;