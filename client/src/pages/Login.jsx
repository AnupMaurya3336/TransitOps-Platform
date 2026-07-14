import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Truck,
    User,
    Phone,
    Loader2
} from "lucide-react";

function Login() {

    const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        navigate("/dashboard");
    }
}, [navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const data = await loginUser({
                email,
                password
            });

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success("Login Successful");

            setTimeout(() => {

                navigate("/dashboard");

            }, 500);

        }
        catch (error) {

            toast.error(error.message || "Login Failed");

        }
        finally {

            setLoading(false);

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
                            className={`w-1/2 py-3 rounded-xl font-semibold ${isLogin ? "bg-blue-600 text-white" : "text-gray-600"}`}
                        >

                            Login

                        </button>

                        <button
                            onClick={() => setIsLogin(false)}
                            className={`w-1/2 py-3 rounded-xl font-semibold ${!isLogin ? "bg-green-600 text-white" : "text-gray-600"}`}
                        >

                            Sign Up

                        </button>

                    </div>

                    <h2 className="text-3xl font-bold text-gray-800">

                        {isLogin ? "Welcome Back" : "Create Account"}

                    </h2>

                    <p className="text-gray-500 mt-2 mb-6">

                        {isLogin ? "Login to manage your fleet" : "Register your TransitOps account"}

                    </p>

                    {!isLogin && (

                        <div className="mb-4 flex items-center border rounded-xl px-4">

                            <User size={20} />

                            <input
                                placeholder="Full Name"
                                className="w-full p-3 outline-none"
                            />

                        </div>

                    )}

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

                    {!isLogin && (

                        <div className="mb-4 flex items-center border rounded-xl px-4">

                            <Phone size={20} />

                            <input
                                placeholder="Phone Number"
                                className="w-full p-3 outline-none"
                            />

                        </div>

                    )}

                    <div className="mb-6 flex items-center border rounded-xl px-4">

                        <Lock size={20} />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >

                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}

                        </button>

                    </div>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleLogin}
                        className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-white font-semibold ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >

                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Logging In...
                            </>
                        ) : (
                            isLogin ? "Login" : "Create Account"
                        )}

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