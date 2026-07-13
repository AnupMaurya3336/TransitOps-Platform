import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    addExpense,
    getExpenses,
    getExpenseByVehicle,
    deleteExpense
} from "../controllers/expenseController.js";

const router = express.Router();

// Add Expense
router.post("/", protect, addExpense);

// Get All Expenses
router.get("/", protect, getExpenses);

// Get Expenses By Vehicle
router.get("/vehicle/:vehicleId", protect, getExpenseByVehicle);

// Delete Expense
router.delete("/:id", protect, deleteExpense);

export default router;