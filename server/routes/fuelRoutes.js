import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    addFuel,
    getFuelLogs,
    deleteFuelLog,
    getFuelByVehicle
} from "../controllers/fuelController.js";

const router = express.Router();

// Add Fuel Log
router.post("/", protect, addFuel);

// Get All Fuel Logs
router.get("/", protect, getFuelLogs);

// Get Fuel History By Vehicle
router.get("/vehicle/:vehicleId", protect, getFuelByVehicle);

// Delete Fuel Log
router.delete("/:id", protect, deleteFuelLog);

export default router;