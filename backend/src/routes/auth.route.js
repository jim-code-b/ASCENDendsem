import express from "express";
import { signup, login, logout, onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

// ✅ These should be POST routes, not GET
router.post("/signup", signup);
router.post("/login", login);

// logout can stay GET or POST depending on your design
router.post("/logout", logout);

    router.post("/onboarding", protectRoute, onboard);
    
    router.get("/me", protectRoute, (req, res) => {
        res.status(200).json({ user: req.user });
    });

export default router;
