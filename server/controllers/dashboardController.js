import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";
import Trip from "../models/Trip.js";
import Fuel from "../models/Fuel.js";
import Expense from "../models/Expense.js";
import Maintenance from "../models/Maintenance.js";

export const getDashboard = async (req, res) => {

    try {

        const totalVehicles = await Vehicle.countDocuments();

        const availableVehicles = await Vehicle.countDocuments({
            status: "Available"
        });

        const activeVehicles = await Vehicle.countDocuments({
            status: "On Trip"
        });

        const inShopVehicles = await Vehicle.countDocuments({
            status: "In Shop"
        });

        const retiredVehicles = await Vehicle.countDocuments({
            status: "Retired"
        });

        const totalDrivers = await Driver.countDocuments();

        const driversOnTrip = await Driver.countDocuments({
            status: "On Trip"
        });

        const availableDrivers = await Driver.countDocuments({
            status: "Available"
        });

        const totalTrips = await Trip.countDocuments();

        const activeTrips = await Trip.countDocuments({
            status: "Dispatched"
        });

        const completedTrips = await Trip.countDocuments({
            status: "Completed"
        });

        const pendingTrips = await Trip.countDocuments({
            status: "Draft"
        });

        const fuelCost = await Fuel.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$cost"
                    }
                }
            }
        ]);

        const expenseCost = await Expense.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        const maintenanceCost = await Maintenance.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$cost"
                    }
                }
            }
        ]);

        const fleetUtilization =
            totalVehicles === 0
                ? 0
                : ((activeVehicles / totalVehicles) * 100).toFixed(2);

        res.status(200).json({
            success: true,

            dashboard: {
                totalVehicles,
                availableVehicles,
                activeVehicles,
                inShopVehicles,
                retiredVehicles,
                totalDrivers,
                availableDrivers,
                driversOnTrip,
                totalTrips,
                activeTrips,
                pendingTrips,
                completedTrips,

                fuelCost:
                    fuelCost.length > 0
                        ? fuelCost[0].total
                        : 0,

                expenseCost:
                    expenseCost.length > 0
                        ? expenseCost[0].total
                        : 0,
                maintenanceCost:
                    maintenanceCost.length > 0
                        ? maintenanceCost[0].total
                        : 0,
                fleetUtilization
            }
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};