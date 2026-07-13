import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    createTrip,
    dispatchTrip,
    completeTrip,
    cancelTrip
} from "../controllers/tripController.js";

const router = express.Router();

// Create Trip
router.post("/", protect, createTrip);

// Dispatch Trip
router.patch("/dispatch/:id", protect, dispatchTrip);

// Complete Trip
router.patch("/complete/:id", protect, completeTrip);

// Cancel Trip
router.patch("/cancel/:id", protect, cancelTrip);

export default router;