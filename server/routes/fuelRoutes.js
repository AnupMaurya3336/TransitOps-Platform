import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    createFuel,
    getFuel,
    deleteFuel
} from "../controllers/fuelController.js";


const router = express.Router();


// Add Fuel
router.post("/", protect, createFuel);


// Get All Fuel Records
router.get("/", protect, getFuel);


// Delete Fuel
router.delete("/:id", protect, deleteFuel);


export default router;