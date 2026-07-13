import {
    Bell,
    UserCircle
} from "lucide-react";

function Navbar() {
    return (
        <div className="
            h-20
            bg-white
            rounded-2xl
            shadow-sm
            flex
            items-center
            justify-between
            px-6
            mb-6
        ">
            <div>

                <h2 className="
                    text-2xl
                    font-bold
                    text-gray-800
                ">
                    Dashboard

                </h2>
                <p className="
                    text-gray-500
                    text-sm
                ">
                    Smart Transport Operations Overview

                </p>
            </div>
            <div className="
                flex
                items-center
                gap-6
            ">
                <button className="
                    relative
                    text-gray-600
                ">

                    <Bell size={24} />
                    <span className="
                        absolute
                        top-0
                        right-0
                        w-2
                        h-2
                        bg-green-500
                        rounded-full
                    ">
                    </span>


                </button>

                <div className="
                    flex
                    items-center
                    gap-3
                ">


                    <UserCircle
                        size={38}
                        className="text-blue-600"
                    />


                    <div>

                        <p className="
                            font-semibold
                            text-gray-800
                        ">

                            Fleet Manager

                        </p>


                        <p className="
                            text-sm
                            text-gray-500
                        ">

                            Admin

                        </p>


                    </div>


                </div>


            </div>


        </div>

    );

}


export default Navbar;