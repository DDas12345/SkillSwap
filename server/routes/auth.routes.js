import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/protected", authenticateUser, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "You have accessed a protected route!",
    user: req.user,
  });
});

export default router;
