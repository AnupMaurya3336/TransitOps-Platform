import { Truck, Users, Route, Wrench, Fuel, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";
import TripChart from "../components/dashboard/TripChart";
import VehicleStatusChart from "../components/dashboard/VehicleStatusChart";
import RecentTrips from "../components/dashboard/RecentTrips";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    useEffect(() => {
        loadDashboard();
    }, []);
    const loadDashboard = async () => {
        try {
            const result = await getDashboardData();
            setDashboard(result.data.dashboard);
        }
        catch (error) {
            console.log(error);
        }
    };
    if (!dashboard) {
        return <Loader />;
    }
    const cards = [
        {
            title: "Total Vehicles",
            value: dashboard.totalVehicles || 0,
            icon: <Truck />,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },
        {
            title: "Total Drivers",
            value: dashboard.totalDrivers || 0,
            icon: <Users />,
            color: "text-green-600",
            bg: "bg-green-100"
        },
        {
            title: "Active Trips",
            value: dashboard.activeTrips || 0,
            icon: <Route />,
            color: "text-purple-600",
            bg: "bg-purple-100"
        },
        {
            title: "Maintenance",
            value: `₹ ${(dashboard.maintenanceCost || 0).toLocaleString()}`,
            icon: <Wrench />,
            color: "text-orange-600",
            bg: "bg-orange-100"
        },
        {
            title: "Fuel Usage",
            value: `₹ ${(dashboard.fuelCost || 0).toLocaleString()}`,
            icon: <Fuel />,
            color: "text-yellow-600",
            bg: "bg-yellow-100"
        },
        {
            title: "Expenses",
            value: `₹ ${(dashboard.expenseCost || 0).toLocaleString()}`,
            icon: <Wallet />,
            color: "text-red-600",
            bg: "bg-red-100"
        }
    ];
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800">
                TransitOps Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
                Smart Transport Operations Overview
            </p>
            <p className="text-sm text-gray-400 mt-1">
                Real-time Fleet Monitoring Dashboard
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
                {
                    cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm p-6 hover:-translate-y-1 hover:shadow-xl transition duration-300"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.bg} ${card.color}`}>
                                {card.icon}
                            </div>
                            <h2 className="text-gray-500 mt-5">
                                {card.title}
                            </h2>
                            <h3 className={`text-4xl font-bold mt-2 ${card.color}`}>
                                {card.value}
                            </h3>
                        </div>
                    ))
                }
            </div>
            <div className="grid lg:grid-cols-2 gap-6 mt-8">
                <TripChart data={dashboard} />
                <VehicleStatusChart data={dashboard} />
            </div>
            <RecentTrips />
        </div>
    );
}


export default Dashboard;