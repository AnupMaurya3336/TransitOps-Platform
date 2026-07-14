import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

function EditVehicleModal({ open, onClose, vehicle, onSuccess }) {

    const [form, setForm] = useState({
        registrationNumber: "",
        vehicleName: "",
        type: "",
        capacity: "",
        odometer: "",
        acquisitionCost: "",
        status: "Available"
    });

    useEffect(() => {

        if (vehicle) {

            setForm({
                registrationNumber: vehicle.registrationNumber || "",
                vehicleName: vehicle.vehicleName || "",
                type: vehicle.type || "",
                capacity: vehicle.capacity || "",
                odometer: vehicle.odometer || "",
                acquisitionCost: vehicle.acquisitionCost || "",
                status: vehicle.status || "Available"
            });

        }

    }, [vehicle]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/vehicles/${vehicle._id}`, form);

            toast.success("Vehicle Updated");

            onSuccess();

            onClose();

        }
        catch (error) {

            toast.error(error.response?.data?.message || "Update Failed");

        }

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl p-8 w-full max-w-xl">

                <h2 className="text-2xl font-bold mb-6">
                    Edit Vehicle
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                    <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} className="border rounded-xl p-3 outline-none"/>

                    <input name="vehicleName" value={form.vehicleName} onChange={handleChange} className="border rounded-xl p-3 outline-none"/>

                    <input name="type" value={form.type} onChange={handleChange} className="border rounded-xl p-3 outline-none"/>

                    <input name="capacity" value={form.capacity} onChange={handleChange} className="border rounded-xl p-3 outline-none"/>

                    <input name="odometer" value={form.odometer} onChange={handleChange} className="border rounded-xl p-3 outline-none"/>

                    <input name="acquisitionCost" value={form.acquisitionCost} onChange={handleChange} className="border rounded-xl p-3 outline-none"/>

                    <select name="status" value={form.status} onChange={handleChange} className="border rounded-xl p-3">

                        <option>Available</option>
                        <option>On Trip</option>
                        <option>In Shop</option>
                        <option>Retired</option>

                    </select>

                    <div className="col-span-2 flex justify-end gap-3 mt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 px-5 py-3 rounded-xl"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                        >
                            Update Vehicle
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditVehicleModal;