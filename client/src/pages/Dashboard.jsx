import { Truck, Users, Route, Wrench, Fuel, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";
import TripChart from "../components/dashboard/TripChart";


function Dashboard() {

    const [dashboard, setDashboard] = useState(null);


    useEffect(() => {

        loadDashboard();

    }, []);



    const loadDashboard = async () => {

        try {

            const result = await getDashboardData();

            setDashboard(result);

        }
        catch (error) {

            console.log(error);

        }

    };



    const cards = [

        {
            title: "Total Vehicles",
            value: dashboard?.vehicles?.count || 0,
            icon: <Truck />,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },

        {
            title: "Total Drivers",
            value: dashboard?.drivers?.count || 0,
            icon: <Users />,
            color: "text-green-600",
            bg: "bg-green-100"
        },

        {
            title: "Active Trips",
            value: dashboard?.trips?.count || 0,
            icon: <Route />,
            color: "text-purple-600",
            bg: "bg-purple-100"
        },

        {
            title: "Maintenance",
            value: dashboard?.maintenance?.count || 0,
            icon: <Wrench />,
            color: "text-orange-600",
            bg: "bg-orange-100"
        },

        {
            title: "Fuel Usage",
            value: dashboard?.fuel?.count || 0,
            icon: <Fuel />,
            color: "text-yellow-600",
            bg: "bg-yellow-100"
        },

        {
            title: "Expenses",
            value: dashboard?.expense?.count || 0,
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




            <div className="grid md:grid-cols-3 gap-6 mt-8">

                {
                    cards.map((card, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition"
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


            {/* Trip Analytics Chart */}

            <div className="mt-8">

                <TripChart />

            </div>


        </div>

    );

}


export default Dashboard;