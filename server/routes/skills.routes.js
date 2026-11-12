import express from "express";

import {
  getMySkills,
  addSkill,
  deleteSkill,
} from "../controllers/skills.controller.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all skills of the logged-in student
router.get("/", authenticateUser, getMySkills);

// Add a new skill
router.post("/", authenticateUser, addSkill);

// Remove a skill
router.delete("/:id", authenticateUser, deleteSkill);

export default router;
