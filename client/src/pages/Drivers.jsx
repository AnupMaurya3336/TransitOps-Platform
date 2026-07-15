import { useEffect, useState } from "react";
import api from "../services/api";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import AddDriverModal from "../components/drivers/AddDriverModal";
import EditDriverModal from "../components/drivers/EditDriverModal";
import DeleteDriverModal from "../components/drivers/DeleteDriverModal";

function Drivers() {

    const [drivers, setDrivers] = useState([]);
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const [editModal, setEditModal] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        loadDrivers();
    }, []);

    const loadDrivers = async () => {
        try {
            const res = await api.get("/drivers");
            setDrivers(res.data.drivers);
        }
        catch (error) {
            console.log(error);
        }
    };
    const handleEdit = (driver) => {
        setSelectedDriver(driver);
        setEditModal(true);
    };
    const handleDelete = (id) => {
        setDeleteId(id);
        setDeleteModal(true);
    };

    const filteredDrivers = drivers.filter(driver =>
        driver.name.toLowerCase().includes(search.toLowerCase()) ||
        driver.licenseNo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Driver Management
                    </h1>
                    <p className="text-gray-500">
                        Manage your drivers
                    </p>
                </div>

                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl"
                >

                    <Plus size={18} />

                    Add Driver

                </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="relative mb-5">
                    <Search className="absolute left-4 top-3 text-gray-400" />
                    <input
                        placeholder="Search Driver..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-xl pl-11 py-3 outline-none"
                    />

                </div>

                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="py-3 text-left">Name</th>
                            <th className="text-left">License</th>
                            <th className="text-left">Phone</th>
                            <th className="text-left">Status</th>
                            <th className="text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredDrivers.map(driver => (
                                <tr key={driver._id} className="border-b">
                                    <td className="py-4">
                                        {driver.name}
                                    </td>
                                    <td>
                                        {driver.licenseNo}
                                    </td>
                                    <td>
                                        {driver.phone}

                                    </td>
                                    <td>

                                        <span className={`px-3 py-1 rounded-full text-sm ${driver.status === "Available"
                                            ? "bg-green-100 text-green-700"
                                            : driver.status === "On Trip"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-red-100 text-red-700"
                                            }`}>

                                            {driver.status}

                                        </span>

                                    </td>
                                    <td>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEdit(driver)}
                                                className="text-blue-600 hover:text-blue-800">
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(driver._id)}
                                                className="text-red-600 hover:text-red-800">
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
            <AddDriverModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={loadDrivers}
            />
            <EditDriverModal
                open={editModal}
                onClose={() => setEditModal(false)}
                driver={selectedDriver}
                onSuccess={loadDrivers}
            />
            <DeleteDriverModal
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                driverId={deleteId}
                onSuccess={loadDrivers}
            />
        </div>
    );
}

export default Drivers;