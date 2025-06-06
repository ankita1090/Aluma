import express from "express";
import { getChillTracks } from "../controllers/musicController.js";
const router = express.Router();

router.get("/tracks", getChillTracks);

export default router;