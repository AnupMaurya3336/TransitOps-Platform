import Fuel from "../models/Fuel.js";
import Vehicle from "../models/Vehicle.js";

// ====================================
// Add Fuel Log
// ====================================

export const addFuel = async (req, res) => {

    try {

        const {
            vehicle,
            liters,
            cost,
            filledBy
        } = req.body;

        if (
            !vehicle ||
            !liters ||
            !cost
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

        const fuel = await Fuel.create({
            vehicle,
            liters,
            cost,
            filledBy
        });

        res.status(201).json({
            success: true,
            message: "Fuel Log Added Successfully",
            fuel
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ====================================
// Get All Fuel Logs
// ====================================

export const getFuelLogs = async (req, res) => {

    try {

        const fuels = await Fuel.find()
            .populate("vehicle")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: fuels.length,
            fuels
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ====================================
// Delete Fuel Log
// ====================================

export const deleteFuelLog = async (req, res) => {

    try {
        const fuel = await Fuel.findById(req.params.id);
        if (!fuel) {
            return res.status(404).json({
                success: false,
                message: "Fuel Log Not Found"
            });
        }
        await Fuel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Fuel Log Deleted Successfully"
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ====================================
// Get Fuel Logs By Vehicle
// ====================================

export const getFuelByVehicle = async (req, res) => {

    try {
        const fuels = await Fuel.find({
            vehicle: req.params.vehicleId
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: fuels.length,
            fuels
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};