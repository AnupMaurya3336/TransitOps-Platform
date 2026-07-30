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

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


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
        }

    ];


    return (

        <div className="
            w-72
            h-screen
            fixed
            left-0
            top-0
            bg-white
            border-r
            shadow-sm
            p-6
            flex
            flex-col
            z-50
        ">

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

                    <Truck size={28}/>

                </div>


                <h1 className="
                    text-2xl
                    font-bold
                    text-gray-800
                ">

                    TransitOps

                </h1>

            </div>



            <div className="space-y-3 flex-1">

                {
                    menu.map((item,index)=>(

                        <NavLink

                            key={index}

                            to={item.path}

                            className={({isActive})=>

                                `flex items-center gap-4 p-3 rounded-xl transition ${
                                    isActive
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




            <div className="
                mt-auto
                space-y-3
            ">


                <NavLink

                    to="/settings"

                    className={({isActive})=>

                        `flex items-center gap-4 p-3 rounded-xl transition ${
                            isActive
                            ?
                            "bg-blue-600 text-white"
                            :
                            "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        }`

                    }

                >

                    <Settings/>

                    <span className="font-medium">

                        Settings

                    </span>


                </NavLink>




                <div

                    onClick={handleLogout}

                    className="
                        flex
                        items-center
                        gap-4
                        p-3
                        rounded-xl
                        text-red-500
                        hover:bg-red-50
                        cursor-pointer
                    "

                >

                    <LogOut/>

                    <span>

                        Logout

                    </span>


                </div>


            </div>


        </div>

    );

}

export default Sidebar;