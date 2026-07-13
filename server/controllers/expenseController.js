import Expense from "../models/Expense.js";
import Vehicle from "../models/Vehicle.js";

// ======================================
// Add Expense
// ======================================

export const addExpense = async (req, res) => {

    try {

        const {
            vehicle,
            type,
            amount,
            description
        } = req.body;

        if (
            !vehicle ||
            !type ||
            !amount
        ) {

            return res.status(400).json({
                success: false,
                message: "Please Fill All Required Fields"
            });
        }

        const vehicleData = await Vehicle.findById(vehicle);

        if (!vehicleData) {
            return res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            });
        }

        const expense = await Expense.create({
            vehicle,
            type,
            amount,
            description
        });

        res.status(201).json({
            success: true,
            message: "Expense Added Successfully",
            expense
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ======================================
// Get All Expenses
// ======================================

export const getExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find()
            .populate("vehicle")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ======================================
// Get Expenses By Vehicle
// ======================================

export const getExpenseByVehicle = async (req, res) => {

    try {
        const expenses = await Expense.find({
            vehicle: req.params.vehicleId
        }).sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ======================================
// Delete Expense
// ======================================

export const deleteExpense = async (req, res) => {

    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense Not Found"
            });
        }

        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Expense Deleted Successfully"
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};