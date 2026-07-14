import express from "express";

import {
    addVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
} from "../controllers/vehicleController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Add Vehicle (Image Upload)
router.post(
    "/",
    protect,
    upload.single("image"),
    addVehicle
);

// Get All Vehicles
router.get(
    "/",
    protect,
    getVehicles
);

// Get Single Vehicle
router.get(
    "/:id",
    protect,
    getVehicleById
);

// Update Vehicle
router.put(
    "/:id",
    protect,
    upload.single("image"),
    updateVehicle
);

// Delete Vehicle
router.delete(
    "/:id",
    protect,
    deleteVehicle
);

export default router;