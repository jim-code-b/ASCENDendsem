import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken, getVideoToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);
router.get("/video-token", protectRoute, getVideoToken);

export default router;
