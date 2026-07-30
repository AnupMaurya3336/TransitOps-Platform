import { useEffect, useState } from "react";
import api from "../services/api";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";

import AddMaintenanceModal from "../components/maintenance/AddMaintenanceModal";
import {
    closeMaintenance,
    deleteMaintenance
} from "../services/maintenanceService";

function Maintenance() {

    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        loadMaintenance();
    }, []);

    const loadMaintenance = async () => {
        try {

            const res = await api.get("/maintenance");

            setRecords(res.data.records);

        }
        catch (error) {

            console.log(error);

        }
    };

    const handleClose = async (id) => {

        try {

            await closeMaintenance(id);

            toast.success("Maintenance Closed");

            loadMaintenance();

        }
        catch (error) {

            toast.error(error.response?.data?.message || "Something Went Wrong");

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this record?")) return;

        try {

            await deleteMaintenance(id);

            toast.success("Record Deleted");

            loadMaintenance();

        }
        catch (error) {

            toast.error(error.response?.data?.message || "Something Went Wrong");

        }

    };

    const filteredRecords = records.filter(item =>
        (item.issue || "").toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div>

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold">

                        Maintenance

                    </h1>

                    <p className="text-gray-500">

                        Vehicle Maintenance Records

                    </p>

                </div>

                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg"
                >

                    <Plus size={18} />

                    Add Record

                </button>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">

                <div className="relative mb-5">

                    <Search
                        className="absolute left-4 top-3 text-gray-400"
                        size={18}
                    />

                    <input
                        placeholder="Search Issue..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-xl pl-11 py-3 outline-none"
                    />

                </div>

                <table className="w-full">

                    <thead>

                        <tr className="border-b text-left">

                            <th className="py-3">Vehicle</th>
                            <th>Issue</th>
                            <th>Cost</th>
                            <th>Remarks</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredRecords.length > 0 ?

                                filteredRecords.map(item => (

                                    <tr
                                        key={item._id}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td>

                                            {item.vehicle?.vehicleName}

                                        </td>

                                        <td>

                                            {item.issue}

                                        </td>

                                        <td>

                                            ₹ {item.cost}

                                        </td>

                                        <td>

                                            {item.remarks || "-"}

                                        </td>

                                        <td>

                                            {new Date(item.createdAt).toLocaleDateString()}

                                        </td>

                                        <td>

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${item.status === "Closed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >

                                                {item.status}

                                            </span>

                                        </td>

                                        <td>

                                            <div className="flex gap-2">

                                                {

                                                    item.status !== "Closed" && (

                                                        <button
                                                            onClick={() => handleClose(item._id)}
                                                            className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm"
                                                        >

                                                            Close

                                                        </button>

                                                    )

                                                }

                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
                                                >

                                                    Delete

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center py-10 text-gray-400"
                                    >

                                        No Maintenance Records

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

            <AddMaintenanceModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={loadMaintenance}
            />

        </div>

    );

}

export default Maintenance;