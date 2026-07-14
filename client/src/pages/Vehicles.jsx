import { useEffect, useState } from "react";
import api from "../services/api";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import AddVehicleModal from "../components/vehicles/AddVehicleModal";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {

        try {

            const res = await api.get("/vehicles");

            setVehicles(res.data.vehicles);

        } catch (error) {

            console.log(error);

        }

    };

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.vehicleName.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div>

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Vehicle Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage your fleet vehicles
                    </p>

                </div>

                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">

                    <Plus size={18} />

                    Add Vehicle

                </button>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">

                <div className="relative mb-5">

                    <Search className="absolute left-4 top-3 text-gray-400" size={18} />

                    <input
                        type="text"
                        placeholder="Search Vehicle..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <table className="w-full">

                    <thead>

                        <tr className="border-b text-left">

                            <th className="py-3">Registration</th>
                            <th>Vehicle</th>
                            <th>Type</th>
                            <th>Capacity</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredVehicles.map(vehicle => (

                                <tr key={vehicle._id} className="border-b hover:bg-gray-50">

                                    <td className="py-4">

                                        {vehicle.registrationNumber}

                                    </td>

                                    <td>

                                        {vehicle.vehicleName}

                                    </td>

                                    <td>

                                        {vehicle.type}

                                    </td>

                                    <td>

                                        {vehicle.capacity} KG

                                    </td>

                                    <td>

                                        <span className={`px-3 py-1 rounded-full text-sm ${vehicle.status === "Available"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-orange-100 text-orange-700"
                                            }`}>

                                            {vehicle.status}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="flex gap-3">

                                            <button className="text-blue-600">

                                                <Pencil size={18} />

                                            </button>

                                            <button className="text-red-600">

                                                <Trash2 size={18} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>
            <AddVehicleModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={loadVehicles}
            />

        </div>

    );

}

export default Vehicles;