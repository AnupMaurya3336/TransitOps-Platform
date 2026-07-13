import Trip from "../models/Trip.js";
import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";

// =====================================
// Create Trip
// =====================================

export const createTrip = async (req, res) => {
    try {
        const {
            source,
            destination,
            vehicle,
            driver,
            cargoWeight,
            plannedDistance,
            revenue
        } = req.body;
        if (
            !source ||
            !destination ||
            !vehicle ||
            !driver ||
            !cargoWeight ||
            !plannedDistance
        ) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All Required Fields"
            });
        }
        // Vehicle Check
        const vehicleData = await Vehicle.findById(vehicle);
        if (!vehicleData) {
            return res.status(404).json({
                success: false,
                message: "Vehicle Not Found"
            });
        }
        // Driver Check
        const driverData = await Driver.findById(driver);
        if (!driverData) {
            return res.status(404).json({
                success: false,
                message: "Driver Not Found"
            });
        }

        // Vehicle Status Validation
        if (vehicleData.status === "On Trip") {
            return res.status(400).json({
                success: false,
                message: "Vehicle Already On Trip"
            });
        }
        if (vehicleData.status === "In Shop") {
            return res.status(400).json({
                success: false,
                message: "Vehicle Is In Maintenance"
            });
        }
        if (vehicleData.status === "Retired") {
            return res.status(400).json({
                success: false,
                message: "Vehicle Is Retired"
            });
        }
        // Driver Status
        if (driverData.status === "On Trip") {
            return res.status(400).json({
                success: false,
                message: "Driver Already On Trip"
            });
        }
        if (driverData.status === "Suspended") {
            return res.status(400).json({
                success: false,
                message: "Driver Suspended"
            });
        }
        // License Validation
        const today = new Date();
        if (driverData.expiryDate < today) {
            return res.status(400).json({
                success: false,
                message: "Driver License Expired"
            });
        }
        // Capacity Validation
        if (cargoWeight > vehicleData.capacity) {
            return res.status(400).json({
                success: false,
                message: `Vehicle Capacity Exceeded (Max ${vehicleData.capacity} KG)`
            });
        }
        // Create Trip
        const trip = await Trip.create({
            source,
            destination,
            vehicle,
            driver,
            cargoWeight,
            plannedDistance,
            revenue
        });
        res.status(201).json({
            success: true,
            message: "Trip Created Successfully",
            trip
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// =====================================
// Dispatch Trip
// =====================================

export const dispatchTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip Not Found"
            });
        }
        if (trip.status !== "Draft") {
            return res.status(400).json({
                success: false,
                message: "Only Draft Trips Can Be Dispatched"
            });
        }
        const vehicle = await Vehicle.findById(trip.vehicle);
        const driver = await Driver.findById(trip.driver);
        if (!vehicle || !driver) {
            return res.status(404).json({
                success: false,
                message: "Vehicle Or Driver Not Found"
            });
        }

        // Vehicle Validation

        if (vehicle.status !== "Available") {
            return res.status(400).json({
                success: false,
                message: "Vehicle Not Available"
            });
        }

        // Driver Validation

        if (driver.status !== "Available") {
            return res.status(400).json({
                success: false,
                message: "Driver Not Available"
            });
        }
        // License Expiry Check
        const today = new Date();
        if (driver.expiryDate < today) {
            return res.status(400).json({
                success: false,
                message: "Driver License Expired"
            });
        }
        // Update Trip
        trip.status = "Dispatched";
        trip.dispatchDate = new Date();
        await trip.save();
        // Update Vehicle
        vehicle.status = "On Trip";
        await vehicle.save();
        // Update Driver
        driver.status = "On Trip";
        await driver.save();
        res.status(200).json({
            success: true,
            message: "Trip Dispatched Successfully",
            trip
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// =====================================
// Complete Trip
// =====================================

export const completeTrip = async (req, res) => {
    try {
        const {
            actualDistance,
            fuelConsumed,
            finalOdometer
        } = req.body;

        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip Not Found"
            });
        }

        if (trip.status !== "Dispatched") {
            return res.status(400).json({
                success: false,
                message: "Only Dispatched Trips Can Be Completed"
            });
        }

        const vehicle = await Vehicle.findById(trip.vehicle);
        const driver = await Driver.findById(trip.driver);

        // Update Trip

        trip.actualDistance = actualDistance;
        trip.fuelConsumed = fuelConsumed;
        trip.status = "Completed";
        trip.completionDate = new Date();
        await trip.save();

        // Update Vehicle

        vehicle.status = "Available";
        vehicle.odometer = finalOdometer;
        await vehicle.save();
        // Update Driver
        driver.status = "Available";
        await driver.save();
        res.status(200).json({
            success: true,
            message: "Trip Completed Successfully",
            trip
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =====================================
// Cancel Trip
// =====================================

export const cancelTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip Not Found"
            });
        }
        if (trip.status === "Completed") {
            return res.status(400).json({
                success: false,
                message: "Completed Trip Cannot Be Cancelled"
            });
        }
        const vehicle = await Vehicle.findById(trip.vehicle);
        const driver = await Driver.findById(trip.driver);
        trip.status = "Cancelled";
        await trip.save();
        if (vehicle.status === "On Trip") {
            vehicle.status = "Available";
            await vehicle.save();
        }
        if (driver.status === "On Trip") {
            driver.status = "Available";
            await driver.save();
        }
        res.status(200).json({
            success: true,
            message: "Trip Cancelled Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// =====================================
// Get All Trips
// =====================================

export const getTrips = async(req,res)=>{

    try{

        const trips = await Trip.find()
        .populate("vehicle")
        .populate("driver");


        res.status(200).json({

            success:true,

            count:trips.length,

            trips

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};