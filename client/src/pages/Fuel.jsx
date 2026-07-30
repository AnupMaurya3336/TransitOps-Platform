import { useEffect, useState } from "react";
import api from "../services/api";
import { Plus, Search, Trash2 } from "lucide-react";
import AddFuelModal from "../components/fuel/AddFuelModal";
import toast from "react-hot-toast";
import DeleteModal from "../components/common/DeleteModal";

function Fuel() {

    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);


    useEffect(() => {

        loadFuel();

    }, []);



    const loadFuel = async () => {

        try {

            const res = await api.get("/fuel");

            setRecords(res.data.records || []);

        }
        catch (error) {

            console.log(error);

        }

    };



    const handleDelete = async (id) => {

        if (!window.confirm("Delete this fuel record?")) return;

        try {

            await api.delete(`/fuel/${id}`);

            toast.success("Fuel Record Deleted");

            loadFuel();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };



    const filteredRecords = records.filter(item =>

        item.vehicle?.vehicleName
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );



    return (

        <div>


            <div className="flex justify-between items-center mb-6">


                <div>

                    <h1 className="text-3xl font-bold">

                        Fuel Management

                    </h1>


                    <p className="text-gray-500">

                        Manage Vehicle Fuel Records

                    </p>

                </div>



                <button

                    onClick={() => setOpenModal(true)}

                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"

                >

                    <Plus size={18} />

                    Add Fuel

                </button>


            </div>




            <div className="bg-white rounded-2xl shadow-sm p-5">


                <div className="relative mb-5">


                    <Search

                        className="absolute left-4 top-3 text-gray-400"

                        size={18}

                    />


                    <input

                        placeholder="Search Vehicle..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="w-full border rounded-xl pl-11 py-3 outline-none"

                    />


                </div>




                <table className="w-full">


                    <thead>


                        <tr className="border-b text-left">


                            <th className="py-3">
                                Vehicle
                            </th>


                            <th>
                                Quantity
                            </th>


                            <th>
                                Cost
                            </th>


                            <th>
                                Current KM
                            </th>


                            <th>
                                Date
                            </th>


                            <th>
                                Action
                            </th>


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
                                        <td className="py-4">
                                            {item.vehicle?.vehicleName}
                                        </td>
                                        <td>
                                            {item.quantity} L
                                        </td>
                                        <td>
                                            ₹ {item.cost}
                                        </td>
                                        <td>
                                            {item.currentKM} KM
                                        </td>
                                        <td>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => setDeleteId(item._id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-10 text-gray-400"
                                    >
                                        No Fuel Records
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
            <AddFuelModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={loadFuel}
            />
            <DeleteModal
                open={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={() => {
                    handleDelete(deleteId);
                    setDeleteId(null);
                }}
            />
        </div>
    );

}


export default Fuel;