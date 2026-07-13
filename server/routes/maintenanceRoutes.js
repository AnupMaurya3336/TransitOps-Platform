import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    createMaintenance,
    closeMaintenance,
    getMaintenance,
    deleteMaintenance
} from "../controllers/maintenanceController.js";

const router = express.Router();

// Create Maintenance
router.post("/", protect, createMaintenance);

// Get All Maintenance
router.get("/", protect, getMaintenance);

// Close Maintenance
router.patch("/close/:id", protect, closeMaintenance);

// Delete Maintenance
router.delete("/:id", protect, deleteMaintenance);

export default router;