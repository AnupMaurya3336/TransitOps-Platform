import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function AddMaintenanceModal({ open, onClose, onSuccess }) {

    const [vehicles, setVehicles] = useState([]);

    const [form, setForm] = useState({
        vehicle: "",
        issue: "",
        cost: "",
        remarks: ""
    });

    useEffect(() => {

        if (open) {

            loadVehicles();

        }

    }, [open]);

    const loadVehicles = async () => {

        try {

            const res = await api.get("/vehicles");

            console.log("Vehicles API:", res.data);

            setVehicles(res.data.vehicles || []);

        }
        catch (error) {

            console.log(error);

            toast.error("Unable to load vehicles");

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("Maintenance Form:", form);

        try {

            await api.post("/maintenance", form);

            toast.success("Maintenance Record Added");

            setForm({
                vehicle: "",
                issue: "",
                cost: "",
                remarks: ""
            });

            onSuccess();

            onClose();

        }
        catch (error) {

            console.log(error.response);

            toast.error(error.response?.data?.message || "Something Went Wrong");

        }

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-xl p-8">

                <h2 className="text-3xl font-bold mb-6">
                    Add Maintenance
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <select
                        name="vehicle"
                        value={form.vehicle}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    >

                        <option value="">
                            Select Vehicle
                        </option>

                        {
                            vehicles.map(vehicle => (

                                <option
                                    key={vehicle._id}
                                    value={vehicle._id}
                                >
                                    {vehicle.registrationNumber} - {vehicle.vehicleName}
                                </option>

                            ))
                        }

                    </select>

                    <input
                        name="issue"
                        value={form.issue}
                        placeholder="Issue"
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        type="number"
                        name="cost"
                        value={form.cost}
                        placeholder="Maintenance Cost"
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <textarea
                        name="remarks"
                        value={form.remarks}
                        placeholder="Remarks"
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 h-24 resize-none"
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 rounded-xl bg-gray-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            Save Record
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddMaintenanceModal;