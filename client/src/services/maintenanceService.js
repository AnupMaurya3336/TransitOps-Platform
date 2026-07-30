import api from "./api";

export const getMaintenance=()=>api.get("/maintenance");

export const createMaintenance=(data)=>api.post("/maintenance",data);

export const closeMaintenance=(id)=>api.patch(`/maintenance/close/${id}`);

export const deleteMaintenance=(id)=>api.delete(`/maintenance/${id}`);