import Vehicle from "../models/Vehicle.js";

// ===============================
// Add Vehicle
// ===============================
export const addVehicle = async (req, res) => {
    try {
        const {
            registrationNumber,
            vehicleName,
            type,
            capacity,
            odometer,
            acquisitionCost,
            status
        } = req.body;

        if (
            !registrationNumber ||
            !vehicleName ||
            !type ||
            !capacity ||
            odometer === undefined ||
            !acquisitionCost
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }
        const vehicleExists = await Vehicle.findOne({
            registrationNumber: registrationNumber.toUpperCase()
        });
        if (vehicleExists) {
            return res.status(400).json({
                success: false,
                message: "Vehicle Registration Number already exists."
            });
        }
        const vehicle = await Vehicle.create({
            registrationNumber,
            vehicleName,
            type,
            capacity,
            odometer,
            acquisitionCost,
            status
        });
        res.status(201).json({
            success: true,
            message: "Vehicle Added Successfully",
            vehicle
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ===============================
// Get All Vehicles
// ===============================
export const getVehicles = async (req, res) => {

    try {
        const vehicles = await Vehicle.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            count: vehicles.length,
            vehicles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ===============================
// Get Vehicle By ID
// ===============================
export const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            });
        }
        res.status(200).json({
            success: true,
            vehicle
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ===============================
// Update Vehicle
// ===============================
export const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            });
        }

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Vehicle Updated Successfully",
            vehicle: updatedVehicle
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Delete Vehicle
// ===============================
export const deleteVehicle = async (req, res) => {

    try {

        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {

            return res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            });

        }

        await Vehicle.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Vehicle Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};