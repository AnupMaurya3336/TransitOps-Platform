import { useEffect, useState } from "react";
import api from "../services/api";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import AddTripModal from "../components/trips/AddTripModal";
import toast from "react-hot-toast";

import {
    dispatchTrip,
    completeTrip,
    cancelTrip
} from "../services/tripService";

function Trips() {

    const [trips, setTrips] = useState([]);
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        try {
            const res = await api.get("/trips");
            setTrips(res.data.trips);
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleDispatch = async (id) => {
        try {
            await dispatchTrip(id);
            toast.success("Trip Dispatched");
            loadTrips();
        }
        catch (error) {
            toast.error(error.response?.data?.message);
        }
    };
    const handleCancel = async (id) => {
        try {
            await cancelTrip(id);
            toast.success("Trip Cancelled");
            loadTrips();
        }
        catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const filteredTrips = trips.filter(trip =>
        (trip.source || "").toLowerCase().includes(search.toLowerCase()) ||
        (trip.destination || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Trip Management
                    </h1>
                    <p className="text-gray-500">
                        Manage Transport Trips
                    </p>
                </div>

                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl"
                >

                    <Plus size={18} />

                    Create Trip

                </button>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">

                <div className="relative mb-5">

                    <Search
                        className="absolute left-4 top-3 text-gray-400"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search Trip..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                    />

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b text-left">

                                <th className="py-3">Source</th>

                                <th>Destination</th>

                                <th>Vehicle</th>

                                <th>Driver</th>

                                <th>Cargo</th>

                                <th>Distance</th>

                                <th>Revenue</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredTrips.length > 0 ?

                                    filteredTrips.map(trip => (

                                        <tr
                                            key={trip._id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="py-4">

                                                {trip.source}

                                            </td>

                                            <td>

                                                {trip.destination}

                                            </td>

                                            <td>

                                                {trip.vehicle?.vehicleName || "-"}

                                            </td>

                                            <td>

                                                {trip.driver?.name || "-"}

                                            </td>

                                            <td>

                                                {trip.cargoWeight} KG

                                            </td>

                                            <td>

                                                {trip.plannedDistance} KM

                                            </td>

                                            <td>

                                                ₹ {trip.revenue}

                                            </td>

                                            <td>

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${trip.status === "Completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : trip.status === "Dispatched"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : trip.status === "Cancelled"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >

                                                    {trip.status}

                                                </span>

                                            </td>

                                            <td>
                                                <div className="flex gap-2">
                                                    {
                                                        trip.status === "Draft" && (
                                                            <button
                                                                onClick={() => handleDispatch(trip._id)}
                                                                className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
                                                                Dispatch
                                                            </button>
                                                        )
                                                    }
                                                    {
                                                        trip.status === "Dispatched" && (
                                                            <button
                                                                className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm">
                                                                Complete
                                                            </button>
                                                        )
                                                    }
                                                    {
                                                        trip.status !== "Completed" && (
                                                            <button
                                                                onClick={() => handleCancel(trip._id)}
                                                                className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm">
                                                                Cancel
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    :

                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="text-center py-10 text-gray-400"
                                        >
                                            No Trips Found
                                        </td>
                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <AddTripModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={loadTrips}
            />

        </div>

    );

}

export default Trips;