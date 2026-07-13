import express from "express";

import {
    addVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
} from "../controllers/vehicleController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Vehicle
router.post("/", protect, addVehicle);

// Get All Vehicles
router.get("/", protect, getVehicles);

// Get Single Vehicle
router.get("/:id", protect, getVehicleById);

// Update Vehicle
router.put("/:id", protect, updateVehicle);

// Delete Vehicle
router.delete("/:id", protect, deleteVehicle);

export default router;