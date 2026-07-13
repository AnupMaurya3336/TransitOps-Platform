import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        licenseNo: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },

        licenseCategory: {
            type: String,
            required: true,
            enum: [
                "LMV",
                "HMV",
                "Transport",
                "Heavy Transport",
            ],
        },

        expiryDate: {
            type: Date,
            required: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
        },

        safetyScore: {
            type: Number,
            default: 100,
            min: 0,
            max: 100,
        },

        status: {
            type: String,
            enum: [
                "Available",
                "On Trip",
                "Off Duty",
                "Suspended",
            ],
            default: "Available",
        },
    },
    {
        timestamps: true,
    }
);

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;