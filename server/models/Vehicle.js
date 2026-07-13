import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        registrationNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },

        vehicleName: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            required: true,
            enum: [
                "Truck",
                "Mini Truck",
                "Van",
                "Pickup",
                "Container",
                "Trailer",
                "Bus",
                "Other",
            ],
        },

        capacity: {
            type: Number,
            required: true,
        },

        odometer: {
            type: Number,
            required: true,
            default: 0,
        },

        acquisitionCost: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "Available",
                "On Trip",
                "In Shop",
                "Retired",
            ],
            default: "Available",
        },
    },
    {
        timestamps: true,
    }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;