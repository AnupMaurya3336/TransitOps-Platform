import api from "./api";


export const getDashboardData = async()=>{

    const vehicles = await api.get("/vehicles");

    const drivers = await api.get("/drivers");

    const trips = await api.get("/trips");

    const maintenance = await api.get("/maintenance");

    const fuel = await api.get("/fuel");

    const expense = await api.get("/expense");


    return {

        vehicles: vehicles.data,

        drivers: drivers.data,

        trips: trips.data,

        maintenance: maintenance.data,

        fuel: fuel.data,

        expense: expense.data

    };

};