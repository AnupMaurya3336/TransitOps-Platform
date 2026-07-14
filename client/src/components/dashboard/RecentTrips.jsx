import { useEffect, useState } from "react";
import { getAllTrips } from "../../services/tripService";

function RecentTrips() {

    const [trips, setTrips] = useState([]);

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {

        try {

            const data = await getAllTrips();

            setTrips(data.trips);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-bold text-gray-800">
                    Recent Trips
                </h2>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View All
                </button>

            </div>

            <table className="w-full">

                <thead>

                    <tr className="text-left border-b">

                        <th className="py-3">Trip ID</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Driver</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        trips.length > 0 ?

                            trips.map((trip) => (

                                <tr key={trip._id} className="border-b hover:bg-gray-50">

                                    <td className="py-4">
                                        {trip._id.slice(-6)}
                                    </td>

                                    <td>
                                        {trip.source}
                                    </td>

                                    <td>
                                        {trip.destination}
                                    </td>

                                    <td>
                                        {trip.driver?.name || "N/A"}
                                    </td>

                                    <td>

                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            trip.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : trip.status === "Dispatched"
                                                ? "bg-blue-100 text-blue-700"
                                                : trip.status === "Draft"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}>

                                            {trip.status}

                                        </span>

                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td colSpan="5" className="text-center py-6 text-gray-500">

                                    No Trips Found

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default RecentTrips;