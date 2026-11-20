import express from "express";

import {
    getMyProfile,
    updateMyProfile,
} from "../controllers/profile.controller.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// View my profile
router.get("/me", authenticateUser, getMyProfile);

// Edit my profile
router.put("/me", authenticateUser, updateMyProfile);

export default router;