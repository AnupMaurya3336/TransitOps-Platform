import api from "./api";

// Get All Trips
export const getAllTrips = () => api.get("/trips");

// Create Trip
export const createTrip = (data) => api.post("/trips", data);

// Dispatch Trip
export const dispatchTrip = (id) => api.patch(`/trips/dispatch/${id}`);

// Complete Trip
export const completeTrip = (id, data) => api.patch(`/trips/complete/${id}`, data);

// Cancel Trip
export const cancelTrip = (id) => api.patch(`/trips/cancel/${id}`);