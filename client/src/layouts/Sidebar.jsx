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


function Sidebar(){

    const menu = [

        {
            name:"Dashboard",
            icon:<LayoutDashboard/>
        },

        {
            name:"Vehicles",
            icon:<Truck/>
        },

        {
            name:"Drivers",
            icon:<Users/>
        },

        {
            name:"Trips",
            icon:<Route/>
        },

        {
            name:"Maintenance",
            icon:<Wrench/>
        },

        {
            name:"Fuel",
            icon:<Fuel/>
        },

        {
            name:"Expenses",
            icon:<Wallet/>
        },

        {
            name:"Reports",
            icon:<BarChart3/>
        },

        {
            name:"Settings",
            icon:<Settings/>
        }

    ];



    return(

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





            {/* Menu */}

            <div className="space-y-3">


                {
                    menu.map((item,index)=>(

                        <div

                        key={index}

                        className="
                            flex
                            items-center
                            gap-4
                            p-3
                            rounded-xl
                            text-gray-600
                            hover:bg-blue-50
                            hover:text-blue-600
                            cursor-pointer
                            transition
                        "

                        >

                            {item.icon}

                            <span className="font-medium">

                                {item.name}

                            </span>


                        </div>

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

                <LogOut/>

                <span>
                    Logout
                </span>


            </div>



        </div>

    );

}


export default Sidebar;