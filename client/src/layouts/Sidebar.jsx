import {
    LayoutDashboard,
    Truck,
    Users,
    Route,
    Wrench,
    Fuel,
    Wallet,
    BarChart3,
    Settings,
    LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {

    const menu = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <LayoutDashboard />
        },

        {
            name: "Vehicles",
            path: "/vehicles",
            icon: <Truck />
        },

        {
            name: "Drivers",
            path: "/drivers",
            icon: <Users />
        },

        {
            name: "Trips",
            path: "/trips",
            icon: <Route />
        },

        {
            name: "Maintenance",
            path: "/maintenance",
            icon: <Wrench />
        },

        {
            name: "Fuel",
            path: "/fuel",
            icon: <Fuel />
        },

        {
            name: "Expenses",
            path: "/expenses",
            icon: <Wallet />
        },

        {
            name: "Reports",
            path: "/reports",
            icon: <BarChart3 />
        },

        {
            name: "Settings",
            path: "/settings",
            icon: <Settings />
        }

    ];



    return (

        <div className="
            w-72
            min-h-screen
            bg-white
            border-r
            shadow-sm
            p-6
        ">


            {/* Logo */}

            <div className="
                flex
                items-center
                gap-3
                mb-10
            ">

                <div className="
                    bg-blue-600
                    text-white
                    p-3
                    rounded-xl
                ">

                    <Truck size={28} />

                </div>


                <h1 className="
                    text-2xl
                    font-bold
                    text-gray-800
                ">

                    TransitOps

                </h1>


            </div>





            {/* Menu */}

            <div className="space-y-3">


                {
                    menu.map((item, index) => (

                        <NavLink

                            key={index}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center gap-4 p-3 rounded-xl transition ${isActive
                                    ?
                                    "bg-blue-600 text-white"
                                    :
                                    "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                }`

                            }

                        >

                            {item.icon}

                            <span className="font-medium">

                                {item.name}

                            </span>

                        </NavLink>

                    ))
                }


            </div>





            {/* Logout */}

            <div className="
                mt-10
                flex
                items-center
                gap-4
                p-3
                rounded-xl
                text-red-500
                hover:bg-red-50
                cursor-pointer
            ">

                <LogOut />

                <span>
                    Logout
                </span>


            </div>



        </div>

    );

}


export default Sidebar;