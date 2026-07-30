import { User, Shield, Lock, LogOut } from "lucide-react";


function Settings(){

    return(

        <div>


            <div className="mb-6">

                <h1 className="text-3xl font-bold text-gray-800">
                    Settings
                </h1>

                <p className="text-gray-500">
                    Manage your account settings
                </p>

            </div>



            <div className="grid lg:grid-cols-2 gap-6">



                {/* Profile */}

                <div className="bg-white rounded-2xl shadow-sm p-6">


                    <div className="flex items-center gap-4 mb-5">

                        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">

                            <User/>

                        </div>


                        <h2 className="text-xl font-bold">

                            Profile Information

                        </h2>


                    </div>



                    <div className="space-y-3">


                        <p>
                            <span className="text-gray-500">
                                Name:
                            </span>
                            {" "}Anup Maurya
                        </p>


                        <p>
                            <span className="text-gray-500">
                                Role:
                            </span>
                            {" "}Fleet Manager
                        </p>


                        <p>
                            <span className="text-gray-500">
                                Email:
                            </span>
                            {" "}admin@transitops.com
                        </p>


                    </div>


                </div>





                {/* Security */}

                <div className="bg-white rounded-2xl shadow-sm p-6">


                    <div className="flex items-center gap-4 mb-5">


                        <div className="bg-green-100 text-green-600 p-3 rounded-xl">

                            <Shield/>

                        </div>


                        <h2 className="text-xl font-bold">

                            Security

                        </h2>


                    </div>



                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100">

                        <Lock size={20}/>

                        Change Password

                    </button>



                    <button className="flex items-center gap-3 w-full p-3 rounded-xl text-red-500 hover:bg-red-50">


                        <LogOut size={20}/>

                        Logout


                    </button>


                </div>



            </div>


        </div>

    );

}


export default Settings;