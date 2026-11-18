import express from "express";

import {
  getMySkills,
  getExploreSkills,
  addSkill,
  deleteSkill,
} from "../controllers/skills.controller.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get teaching skills shared by other students
router.get("/explore", authenticateUser, getExploreSkills);

// Get all skills of the logged-in student
router.get("/", authenticateUser, getMySkills);

// Add a new skill
router.post("/", authenticateUser, addSkill);

// Remove a skill
router.delete("/:id", authenticateUser, deleteSkill);

export default router;
