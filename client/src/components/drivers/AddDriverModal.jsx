import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function AddDriverModal({ open, onClose, onSuccess }) {

    const [form, setForm] = useState({
        name: "",
        licenseNo: "",
        licenseCategory: "",
        expiryDate: "",
        phone: "",
        safetyScore: 100,
        status: "Available"
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/drivers", form);

            toast.success("Driver Added Successfully");

            onSuccess();

            onClose();

        }
        catch (error) {

            toast.error(error.response?.data?.message || "Something Went Wrong");

        }

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-2xl p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Add Driver

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >

                    <input
                        name="name"
                        placeholder="Driver Name"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        name="licenseNo"
                        placeholder="License Number"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        name="licenseCategory"
                        placeholder="License Category"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        type="date"
                        name="expiryDate"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        type="number"
                        name="safetyScore"
                        placeholder="Safety Score"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <select
                        name="status"
                        onChange={handleChange}
                        className="border rounded-xl p-3"
                    >

                        <option>Available</option>
                        <option>On Trip</option>
                        <option>Suspended</option>

                    </select>

                    <div className="col-span-2 flex justify-end gap-3 mt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 rounded-xl bg-gray-200"
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
                        >

                            Save Driver

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddDriverModal;