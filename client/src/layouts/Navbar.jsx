import { Bell, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar(){

    const navigate=useNavigate();

    const user=JSON.parse(localStorage.getItem("user"));

    const handleLogout=()=>{

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        toast.success("Logged Out Successfully");

        setTimeout(()=>{

            navigate("/");

        },500);

    };

    return(

        <div className="h-20 bg-white rounded-2xl shadow-sm flex items-center justify-between px-6 mb-6">

            <div>

                <h2 className="text-2xl font-bold text-gray-800">

                    Dashboard

                </h2>

                <p className="text-gray-500 text-sm">

                    Smart Transport Operations Overview

                </p>

            </div>

            <div className="flex items-center gap-6">

                <button className="relative text-gray-600 hover:text-blue-600">

                    <Bell size={24}/>

                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>

                </button>

                <div className="flex items-center gap-3">

                    <UserCircle size={42} className="text-blue-600"/>

                    <div>

                        <p className="font-semibold text-gray-800">

                            {user?.name || "Fleet Manager"}

                        </p>

                        <p className="text-sm text-gray-500">

                            {user?.role || "Admin"}

                        </p>

                    </div>

                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                >

                    <LogOut size={18}/>

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Navbar;