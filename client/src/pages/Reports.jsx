import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";


function Reports() {

    const [data, setData] = useState(null);
    useEffect(() => {
        loadDashboard();
    }, []);
    const loadDashboard = async () => {
        try {
            const res = await getDashboardData();
            setData(res.data.dashboard);
        }
        catch (error) {
            console.log(error);
        }
    };
    if (!data) {
        return (
            <div className="text-center py-10">
                Loading Reports...
            </div>
        );
    }
    const cards = [
        {
            title: "Total Vehicles",
            value: data.totalVehicles
        },
        {
            title: "Total Drivers",
            value: data.totalDrivers
        },
        {
            title: "Total Trips",
            value: data.totalTrips
        },
        {
            title: "Fleet Utilization",
            value: data.fleetUtilization + "%"
        },
        {
            title: "Fuel Cost",
            value: "₹ " + data.fuelCost
        },
        {
            title: "Maintenance Cost",
            value: "₹ " + data.maintenanceCost
        },
        {
            title: "Expense Cost",
            value: "₹ " + data.expenseCost
        },
        {
            title: "Completed Trips",
            value: data.completedTrips
        }
    ];

    const tripData = [
        {
            name: "Completed",
            value: data.completedTrips
        },
        {
            name: "Active",
            value: data.activeTrips
        },
        {
            name: "Pending",
            value: data.pendingTrips
        }
    ];

    const costData = [
        {
            name: "Fuel",
            amount: data.fuelCost
        },
        {
            name: "Maintenance",
            amount: data.maintenanceCost
        },
        {
            name: "Expense",
            amount: data.expenseCost
        }
    ];
    const vehicleData = [

        {
            name: "Available",
            value: data.availableVehicles
        },

        {
            name: "On Trip",
            value: data.activeVehicles
        },

        {
            name: "In Shop",
            value: data.inShopVehicles
        },

        {
            name: "Retired",
            value: data.retiredVehicles
        }

    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Reports & Analytics
                </h1>
                <p className="text-gray-500">
                    Transport operation insights
                </p>
            </div>
            <div className="grid grid-cols-4 gap-5">
                {
                    cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm p-6"
                        >
                            <h2 className="text-gray-500 text-sm">
                                {card.title}
                            </h2>
                            <p className="text-3xl font-bold mt-3">
                                {card.value}
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-5">
                        Trip Status
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={tripData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                            >
                                {
                                    tripData.map((entry, index) => (
                                        <Cell key={index} />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-5">
                        Cost Analysis
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={costData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="amount" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-5">
                    Vehicle Status
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={vehicleData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                        >
                            {
                                vehicleData.map((entry, index) => (
                                    <Cell key={index} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>


            </div>
        </div>

    );
}


export default Reports;