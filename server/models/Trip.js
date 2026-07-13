import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
    {
        source: {
            type: String,
            required: true,
            trim: true,
        },

        destination: {
            type: String,
            required: true,
            trim: true,
        },

        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },

        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            required: true,
        },

        cargoWeight: {
            type: Number,
            required: true,
        },

        plannedDistance: {
            type: Number,
            required: true,
        },

        actualDistance: {
            type: Number,
            default: 0,
        },

        fuelConsumed: {
            type: Number,
            default: 0,
        },

        revenue: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "Dispatched",
                "Completed",
                "Cancelled"
            ],
            default: "Draft",
        },

        dispatchDate: {
            type: Date,
        },

        completionDate: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;