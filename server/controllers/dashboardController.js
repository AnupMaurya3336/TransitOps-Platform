import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";
import Trip from "../models/Trip.js";
import Fuel from "../models/Fuel.js";
import Expense from "../models/Expense.js";
import Maintenance from "../models/Maintenance.js";

export const getDashboard = async (req, res) => {

    try {

        const [
            totalVehicles,
            availableVehicles,
            activeVehicles,
            inShopVehicles,
            retiredVehicles,

            totalDrivers,
            driversOnTrip,
            availableDrivers,

            totalTrips,
            activeTrips,
            completedTrips,
            pendingTrips,

            fuelCost,
            expenseCost,
            maintenanceCost

        ] = await Promise.all([

            Vehicle.countDocuments(),

            Vehicle.countDocuments({
                status: "Available"
            }),

            Vehicle.countDocuments({
                status: "On Trip"
            }),

            Vehicle.countDocuments({
                status: "In Shop"
            }),

            Vehicle.countDocuments({
                status: "Retired"
            }),

            Driver.countDocuments(),

            Driver.countDocuments({
                status: "On Trip"
            }),

            Driver.countDocuments({
                status: "Available"
            }),

            Trip.countDocuments(),

            Trip.countDocuments({
                status: "Dispatched"
            }),

            Trip.countDocuments({
                status: "Completed"
            }),

            Trip.countDocuments({
                status: "Draft"
            }),

            Fuel.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$cost"
                        }
                    }
                }
            ]),

            Expense.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount"
                        }
                    }
                }
            ]),

            Maintenance.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$cost"
                        }
                    }
                }
            ])

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
                    fuelCost[0]?.total || 0,

                expenseCost:
                    expenseCost[0]?.total || 0,

                maintenanceCost:
                    maintenanceCost[0]?.total || 0,

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