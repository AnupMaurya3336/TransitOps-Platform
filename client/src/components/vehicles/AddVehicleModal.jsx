import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

function AddVehicleModal({ open, onClose, onSuccess }) {

    const [form, setForm] = useState({
        registrationNumber: "",
        vehicleName: "",
        type: "",
        capacity: "",
        odometer: "",
        acquisitionCost: "",
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

            await api.post("/vehicles", form);

            toast.success("Vehicle Added Successfully");

            onSuccess();

            onClose();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message || "Something Went Wrong"
            );

        }

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Add Vehicle
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                    <input
                        name="registrationNumber"
                        placeholder="Vehicle Number"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        name="vehicleName"
                        placeholder="Vehicle Name"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <select
                        name="type"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    >

                        <option value="">Select Vehicle Type</option>

                        <option value="Truck">Truck</option>

                        <option value="Mini Truck">Mini Truck</option>

                        <option value="Pickup">Pickup</option>

                        <option value="Trailer">Trailer</option>

                        <option value="Container">Container</option>

                        <option value="Bus">Bus</option>

                    </select>

                    <input
                        name="capacity"
                        placeholder="Load Capacity (KG)"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        name="odometer"
                        placeholder="Current KM"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        name="acquisitionCost"
                        placeholder="Purchase Cost"
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    >

                        <option value="Available">
                            Available
                        </option>

                        <option value="On Trip">
                            On Trip
                        </option>

                        <option value="In Shop">
                            Maintenance
                        </option>

                        <option value="Retired">
                            Retired
                        </option>

                    </select>

                    <div className="col-span-2 flex justify-end gap-3 mt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Save Vehicle
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddVehicleModal;