import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Truck,
    User,
    Phone
} from "lucide-react";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLogin, setIsLogin] = useState(true);

    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser({
                email,
                password
            });

            console.log("LOGIN RESPONSE:", data);

            console.log("TOKEN:", data.token);

            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            alert("Login Successful");


            navigate("/dashboard");


        }
        catch (error) {

            alert(
                error.message || "Login Failed"
            );

        }

    };



    return (

        <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-gray-100 to-green-50">


            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-green-600 text-white items-center justify-center p-16">


                <div>

                    <div className="flex items-center gap-4 mb-8">

                        <div className="bg-white/20 p-4 rounded-2xl">

                            <Truck size={45} />

                        </div>


                        <h1 className="text-4xl font-bold">
                            TransitOps
                        </h1>


                    </div>



                    <h2 className="text-5xl font-bold leading-tight">

                        Smart Fleet
                        <br />
                        Management System

                    </h2>



                    <p className="mt-6 text-lg text-white/80">

                        Manage vehicles, drivers, trips and expenses from one powerful platform.

                    </p>



                    <div className="mt-10 space-y-4">


                        <p>✓ Vehicle Tracking</p>

                        <p>✓ Driver Management</p>

                        <p>✓ Trip Analytics</p>


                    </div>


                </div>


            </div>





            <div className="flex-1 flex items-center justify-center p-6">


                <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">



                    <div className="flex bg-gray-100 rounded-xl p-1 mb-8">


                        <button

                            onClick={() => setIsLogin(true)}

                            className={`w-1/2 py-3 rounded-xl font-semibold ${isLogin
                                ?
                                "bg-blue-600 text-white"
                                :
                                "text-gray-600"
                                }`}

                        >

                            Login

                        </button>



                        <button

                            onClick={() => setIsLogin(false)}

                            className={`w-1/2 py-3 rounded-xl font-semibold ${!isLogin
                                ?
                                "bg-green-600 text-white"
                                :
                                "text-gray-600"
                                }`}

                        >

                            Sign Up

                        </button>


                    </div>





                    <h2 className="text-3xl font-bold text-gray-800">

                        {
                            isLogin
                                ?
                                "Welcome Back"
                                :
                                "Create Account"
                        }

                    </h2>


                    <p className="text-gray-500 mt-2 mb-6">

                        {
                            isLogin
                                ?
                                "Login to manage your fleet"
                                :
                                "Register your TransitOps account"
                        }

                    </p>





                    {!isLogin &&

                        <div className="mb-4 flex items-center border rounded-xl px-4">

                            <User size={20} />

                            <input

                                placeholder="Full Name"

                                className="w-full p-3 outline-none"

                            />

                        </div>

                    }





                    <div className="mb-4 flex items-center border rounded-xl px-4">


                        <Mail size={20} className="text-blue-600" />


                        <input

                            type="email"

                            placeholder="Email Address"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                            className="w-full p-3 outline-none"

                        />


                    </div>





                    {!isLogin &&

                        <div className="mb-4 flex items-center border rounded-xl px-4">

                            <Phone size={20} />

                            <input

                                placeholder="Phone Number"

                                className="w-full p-3 outline-none"

                            />

                        </div>

                    }





                    <div className="mb-6 flex items-center border rounded-xl px-4">


                        <Lock size={20} />


                        <input

                            type={
                                showPassword
                                    ?
                                    "text"
                                    :
                                    "password"
                            }

                            placeholder="Password"

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}

                            className="w-full p-3 outline-none"

                        />


                        <button

                            onClick={() => setShowPassword(!showPassword)}

                        >

                            {
                                showPassword
                                    ?
                                    <EyeOff size={20} />
                                    :
                                    <Eye size={20} />
                            }


                        </button>


                    </div>





                    <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full py-3 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700"
                    >


                        {
                            isLogin
                                ?
                                "Login"
                                :
                                "Create Account"
                        }


                    </button>





                    <p className="text-center text-sm text-gray-400 mt-6">

                        © 2026 TransitOps

                    </p>



                </div>


            </div>



        </div>

    );

}


export default Login;