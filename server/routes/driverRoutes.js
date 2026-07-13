import express from "express";

import {
    addDriver,
    getDrivers,
    getDriverById,
    updateDriver,
    deleteDriver,
} from "../controllers/driverController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Driver
router.post("/", protect, addDriver);

// Get All Drivers
router.get("/", protect, getDrivers);

// Get Driver By ID
router.get("/:id", protect, getDriverById);

// Update Driver
router.put("/:id", protect, updateDriver);

// Delete Driver
router.delete("/:id", protect, deleteDriver);

export default router;