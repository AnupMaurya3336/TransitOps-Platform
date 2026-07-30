import api from "./api";


// Get Fuel Records
export const getFuelRecords = () => {
    return api.get("/fuel");
};


// Create Fuel
export const createFuel = (data) => {
    return api.post("/fuel", data);
};


// Delete Fuel
export const deleteFuel = (id) => {
    return api.delete(`/fuel/${id}`);
};