import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
    {
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },

        issue: {
            type: String,
            required: true,
            trim: true,
        },

        cost: {
            type: Number,
            required: true,
            default: 0,
        },

        date: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            enum: ["Open", "Closed"],
            default: "Open",
        },

        remarks: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

export default Maintenance;