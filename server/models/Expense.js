import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true
        },

        type: {
            type: String,
            enum: [
                "Toll",
                "Maintenance",
                "Insurance",
                "Parking",
                "Fine",
                "Other"
            ],
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        description: {
            type: String,
            default: ""
        },

        date: {
            type: Date,
            default: Date.now
        }

    },
    {
        timestamps: true
    }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;