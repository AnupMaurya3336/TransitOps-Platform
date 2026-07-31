import { useState } from "react";
import { User, Shield, Lock, LogOut, Eye, EyeOff } from "lucide-react";
import { changePassword } from "../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Settings() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [open, setOpen] = useState(false);

    const [oldPassword, setOldPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOld, setShowOld] = useState(false);

    const [showNew, setShowNew] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    const handleChangePassword = async () => {

        if (!oldPassword || !newPassword || !confirmPassword) {

            return toast.error("Please fill all fields");

        }

        if (newPassword !== confirmPassword) {

            return toast.error("Passwords do not match");

        }

        try {

            const res = await changePassword({
                oldPassword,
                newPassword
            });

            toast.success(res.message);

            setOldPassword("");

            setNewPassword("");

            setConfirmPassword("");

            setOpen(false);

        } catch (error) {

            toast.error(error.message);

        }

    };

    return (

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

                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-4 mb-5">

                        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">

                            <User />

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

                            {" "}{user?.name}

                        </p>

                        <p>

                            <span className="text-gray-500">

                                Role:

                            </span>

                            {" "}{user?.role}

                        </p>

                        <p>

                            <span className="text-gray-500">

                                Email:

                            </span>

                            {" "}{user?.email}

                        </p>

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-4 mb-5">

                        <div className="bg-green-100 text-green-600 p-3 rounded-xl">

                            <Shield />

                        </div>

                        <h2 className="text-xl font-bold">

                            Security

                        </h2>

                    </div>

                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100"
                    >

                        <Lock size={20} />

                        Change Password

                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-red-500 hover:bg-red-50"
                    >

                        <LogOut size={20} />

                        Logout

                    </button>

                </div>

            </div>

            {open && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white w-full max-w-md rounded-2xl p-6">

                        <h2 className="text-2xl font-bold mb-5">

                            Change Password

                        </h2>

                        <div className="space-y-4">

                            <div className="flex items-center border rounded-xl px-4">

                                <input
                                    type={showOld ? "text" : "password"}
                                    placeholder="Old Password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full p-3 outline-none"
                                />

                                <button onClick={() => setShowOld(!showOld)}>

                                    {showOld ? <EyeOff size={20} /> : <Eye size={20} />}

                                </button>

                            </div>

                            <div className="flex items-center border rounded-xl px-4">

                                <input
                                    type={showNew ? "text" : "password"}
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-3 outline-none"
                                />

                                <button onClick={() => setShowNew(!showNew)}>

                                    {showNew ? <EyeOff size={20} /> : <Eye size={20} />}

                                </button>

                            </div>

                            <div className="flex items-center border rounded-xl px-4">

                                <input
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-3 outline-none"
                                />

                                <button onClick={() => setShowConfirm(!showConfirm)}>

                                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}

                                </button>

                            </div>

                        </div>

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                onClick={() => setOpen(false)}
                                className="px-5 py-2 rounded-lg bg-gray-200"
                            >

                                Cancel

                            </button>

                            <button
                                onClick={handleChangePassword}
                                className="px-5 py-2 rounded-lg bg-blue-600 text-white"
                            >

                                Save

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Settings;