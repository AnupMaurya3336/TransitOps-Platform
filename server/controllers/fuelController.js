import Fuel from "../models/Fuel.js";
import Vehicle from "../models/Vehicle.js";


// Create Fuel

export const createFuel = async(req,res)=>{

    try{
        console.log("REQ BODY:", req.body);
        const {
            vehicle,
            quantity,
            cost,
            currentKM,
            remarks
        } = req.body;
        if(!vehicle || !quantity || !cost || !currentKM){
            return res.status(400).json({
                success:false,
                message:"Please Fill All Required Fields"
            });
        }
        const vehicleData = await Vehicle.findById(vehicle);
        if(!vehicleData){
            return res.status(404).json({
                success:false,
                message:"Vehicle Not Found"
            });
        }
        const fuel = await Fuel.create({
            vehicle,
            quantity,
            cost,
            currentKM,
            remarks
        });
        vehicleData.odometer=currentKM;
        await vehicleData.save();
        res.status(201).json({
            success:true,
            message:"Fuel Added Successfully",
            fuel
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
// Get Fuel Records
export const getFuel = async(req,res)=>{
    try{
        const records = await Fuel.find()
        .populate("vehicle")
        .sort({createdAt:-1});
        res.status(200).json({
            success:true,
            records
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

// Delete Fuel
export const deleteFuel = async(req,res)=>{
    try{
        await Fuel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"Fuel Deleted Successfully"
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};