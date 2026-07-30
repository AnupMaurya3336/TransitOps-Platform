import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema(
    {
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        cost: {
            type: Number,
            required: true
        },

        currentKM: {
            type: Number,
            required: true
        },

        fuelDate: {
            type: Date,
            default: Date.now
        },

        remarks: {
            type: String,
            default: ""
        }
    },
    {
        timestamps:true
    }
);


const Fuel = mongoose.model("Fuel",fuelSchema);

export default Fuel;