import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function AddTripModal({ open, onClose, onSuccess }) {

    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);

    const [form, setForm] = useState({
        source: "",
        destination: "",
        vehicle: "",
        driver: "",
        cargoWeight: "",
        plannedDistance: "",
        revenue: ""
    });

    useEffect(() => {

        if (open) {

            loadData();

        }

    }, [open]);

    const loadData = async () => {

        try {

            const vehicleRes = await api.get("/vehicles");

            const driverRes = await api.get("/drivers");

            setVehicles(vehicleRes.data.vehicles);

            setDrivers(driverRes.data.drivers);

        }
        catch (error) {

            console.log(error);

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

        try {

            await api.post("/trips", form);

            toast.success("Trip Created Successfully");

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

            <div className="bg-white rounded-2xl w-full max-w-3xl p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Create Trip

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >

                    <input
                        name="source"
                        placeholder="Source"
                        onChange={handleChange}
                        className="border rounded-xl p-3"
                    />

                    <input
                        name="destination"
                        placeholder="Destination"
                        onChange={handleChange}
                        className="border rounded-xl p-3"
                    />

                    <select
                        name="vehicle"
                        onChange={handleChange}
                        className="border rounded-xl p-3"
                    >

                        <option value="">Select Vehicle</option>

                        {

                            vehicles.map(vehicle => (

                                <option
                                    key={vehicle._id}
                                    value={vehicle._id}
                                >

                                    {vehicle.vehicleName}

                                </option>

                            ))

                        }

                    </select>

                    <select
                        name="driver"
                        onChange={handleChange}
                        className="border rounded-xl p-3"
                    >

                        <option value="">Select Driver</option>

                        {

                            drivers.map(driver => (

                                <option
                                    key={driver._id}
                                    value={driver._id}
                                >

                                    {driver.name}

                                </option>

                            ))

                        }

                    </select>

                    <input
                        type="number"
                        name="cargoWeight"
                        placeholder="Cargo Weight (KG)"
                        onChange={handleChange}
                        className="border rounded-xl p-3"
                    />

                    <input
                        type="number"
                        name="plannedDistance"
                        placeholder="Distance (KM)"
                        onChange={handleChange}
                        className="border rounded-xl p-3"
                    />

                    <input
                        type="number"
                        name="revenue"
                        placeholder="Revenue"
                        onChange={handleChange}
                        className="border rounded-xl p-3"
                    />

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
                            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
                        >

                            Create Trip

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddTripModal;