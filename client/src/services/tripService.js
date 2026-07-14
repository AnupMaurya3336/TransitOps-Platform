import api from "./api";

export const getAllTrips=async()=>{

    const response=await api.get("/trips");

    return response.data;

};