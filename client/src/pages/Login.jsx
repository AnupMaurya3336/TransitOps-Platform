import { useState } from "react";
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
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-gray-100 to-green-50">
            {/* Left Side */}
            <div className="
        hidden lg:flex
        w-1/2
        bg-gradient-to-br
        from-blue-700
        to-green-600
        text-white
        items-center
        justify-center
        p-16
      ">
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="
              bg-white/20
              p-4
              rounded-2xl
            ">
                            <Truck size={45} />
                        </div>
                        <h1 className="text-4xl font-bold">
                            TransitOps
                        </h1>
                    </div>
                    <h2 className="
            text-5xl
            font-bold
            leading-tight
          ">
                        Smart Fleet
                        <br />
                        Management System
                    </h2>
                    <p className="
            mt-6
            text-lg
            text-white/80
            max-w-md
          ">
                        Manage vehicles, drivers,
                        trips and expenses from one
                        powerful platform.
                    </p>
                    <div className="mt-10 space-y-4">
                        <div className="flex gap-3 items-center">
                            <span className="text-green-300">
                                ✓
                            </span>
                            Vehicle Tracking
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="text-green-300">
                                ✓
                            </span>
                            Driver Management
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="text-green-300">
                                ✓
                            </span>
                            Trip Analytics
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="
        flex-1
        flex
        items-center
        justify-center
        p-6
      ">
                <div className="
          bg-white
          w-full
          max-w-md
          rounded-3xl
          shadow-2xl
          p-8
        ">
                    {/* Toggle */}
                    <div className="
            flex
            bg-gray-100
            rounded-xl
            p-1
            mb-8
          ">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`
                w-1/2
                py-3
                rounded-xl
                font-semibold
                ${isLogin
                                    ?
                                    "bg-blue-600 text-white"
                                    :
                                    "text-gray-600"
                                }
              `}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`
                w-1/2
                py-3
                rounded-xl
                font-semibold
                ${!isLogin
                                    ?
                                    "bg-green-600 text-white"
                                    :
                                    "text-gray-600"
                                }
              `}
                        >
                            Sign Up
                        </button>
                    </div>
                    <h2 className="
            text-3xl
            font-bold
            text-gray-800
          ">
                        {
                            isLogin
                                ?
                                "Welcome Back"
                                :
                                "Create Account"
                        }
                    </h2>
                    <p className="
            text-gray-500
            mt-2
            mb-6
          ">
                        {
                            isLogin
                                ?
                                "Login to manage your fleet"
                                :
                                "Register your TransitOps account"
                        }
                    </p>
                    {/* Signup Name */}
                    {!isLogin && (
                        <div className="mb-4">

                            <div className="
                flex
                items-center
                border
                rounded-xl
                px-4
              ">

                                <User
                                    size={20}
                                    className="text-green-600"
                                />
                                <input
                                    placeholder="Full Name"
                                    className="
                    w-full
                    p-3
                    outline-none
                  "
                                />
                            </div>
                        </div>
                    )}
                    {/* Email */}
                    <div className="mb-4">
                        <div className="
              flex
              items-center
              border
              rounded-xl
              px-4
            ">
                            <Mail
                                size={20}
                                className="text-blue-600"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="
                  w-full
                  p-3
                  outline-none
                "
                            />
                        </div>
                    </div>
                    {/* Signup Phone */}
                    {!isLogin && (
                        <div className="mb-4">
                            <div className="
              flex
              items-center
              border
              rounded-xl
              px-4
            ">
                                <Phone
                                    size={20}
                                    className="text-green-600"
                                />
                                <input
                                    placeholder="Phone Number"
                                    className="
                  w-full
                  p-3
                  outline-none
                "
                                />
                            </div>
                        </div>
                    )}
                    {/* Password */}
                    <div className="mb-6">
                        <div className="
              flex
              items-center
              border
              rounded-xl
              px-4
            ">
                            <Lock
                                size={20}
                                className="text-blue-600"
                            />
                            <input
                                type={
                                    showPassword
                                        ?
                                        "text"
                                        :
                                        "password"
                                }
                                placeholder="Password"
                                className="
                  w-full
                  p-3
                  outline-none
                "
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
                    </div>
                    <button

                        className={`
              w-full
              py-3
              rounded-xl
              text-white
              font-semibold
              transition
              ${isLogin
                                ?
                                "bg-blue-600 hover:bg-blue-700"
                                :
                                "bg-green-600 hover:bg-green-700"
                            }
            `}>
                        {
                            isLogin
                                ?
                                "Login"
                                :
                                "Create Account"
                        }
                    </button>
                    <p className="
            text-center
            text-sm
            text-gray-400
            mt-6
          ">
                        © 2026 TransitOps
                    </p>
                </div>
            </div>
        </div>
    );
}


export default Login;