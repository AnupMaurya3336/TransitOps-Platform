import Maintenance from "../models/Maintenance.js";
import Vehicle from "../models/Vehicle.js";

// ====================================
// Create Maintenance
// ====================================

export const createMaintenance = async (req, res) => {

    try {
        const {
            vehicle,
            issue,
            cost,
            remarks
        } = req.body;
        if (!vehicle || !issue || cost === undefined) {
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

        if (vehicleData.status === "Retired") {
            return res.status(400).json({
                success: false,
                message: "Retired Vehicle Cannot Be Maintained"
            });
        }

        const maintenance = await Maintenance.create({
            vehicle,
            issue,
            cost,
            remarks
        });
        // Vehicle Automatically Goes To Shop
        vehicleData.status = "In Shop";
        await vehicleData.save();
        res.status(201).json({
            success: true,
            message: "Maintenance Created Successfully",
            maintenance
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
// Close Maintenance
// ====================================

export const closeMaintenance = async (req, res) => {

    try {
        const maintenance = await Maintenance.findById(req.params.id);
        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance Record Not Found"
            });
        }
        if (maintenance.status === "Closed") {
            return res.status(400).json({
                success: false,
                message: "Maintenance Already Closed"
            });
        }
        maintenance.status = "Closed";
        await maintenance.save();
        const vehicle = await Vehicle.findById(maintenance.vehicle);
        if (vehicle.status !== "Retired") {
            vehicle.status = "Available";
            await vehicle.save();
        }
        res.status(200).json({
            success: true,
            message: "Maintenance Closed Successfully"
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
// Get All Maintenance
// ====================================

export const getMaintenance = async (req, res) => {

    try {
        const records = await Maintenance.find()
            .populate("vehicle")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: records.length,
            records
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
// Delete Maintenance
// ====================================

export const deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(req.params.id);
        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance Record Not Found"
            });
        }
        await Maintenance.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Maintenance Deleted Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};