import Driver from "../models/Driver.js";

// ==============================
// Add Driver
// ==============================

export const addDriver = async (req, res) => {
    try {
        const {
            name,
            licenseNumber,
            licenseCategory,
            expiryDate,
            phone,
            safetyScore,
            status
        } = req.body;
        if (
            !name ||
            !licenseNumber ||
            !licenseCategory ||
            !expiryDate ||
            !phone
        ) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All Required Fields"
            });
        }
        const licenseExists = await Driver.findOne({ licenseNumber });
        if (licenseExists) {
            return res.status(400).json({
                success: false,
                message: "License Number Already Exists"
            });
        }
        const phoneExists = await Driver.findOne({ phone });
        if (phoneExists) {
            return res.status(400).json({
                success: false,
                message: "Phone Number Already Exists"
            });
        }
        const driver = await Driver.create({
            name,
            licenseNumber,
            licenseCategory,
            expiryDate,
            phone,
            safetyScore,
            status
        });
        res.status(201).json({
            success: true,
            message: "Driver Added Successfully",
            driver
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==============================
// Get All Drivers
// ==============================

export const getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: drivers.length,
            drivers
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==============================
// Get Driver By ID
// ==============================

export const getDriverById = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver Not Found"
            });
        }
        res.status(200).json({
            success: true,
            driver
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==============================
// Update Driver
// ==============================

export const updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver Not Found"
            });
        }
        const updatedDriver = await Driver.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            success: true,
            message: "Driver Updated Successfully",
            driver: updatedDriver
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==============================
// Delete Driver
// ==============================

export const deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver Not Found"
            });
        }
        await Driver.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Driver Deleted Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};