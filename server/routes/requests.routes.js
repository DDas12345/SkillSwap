
import express from "express";

import {
    getMyRequests,
    createRequest,
    updateRequestStatus,
} from "../controllers/requests.controller.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateUser, getMyRequests);

router.post("/", authenticateUser, createRequest);

router.patch("/:id/status", authenticateUser, updateRequestStatus);

export default router;
