import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function EditDriverModal({ open, onClose, driver, onSuccess }) {

    const [form, setForm] = useState({
        name: "",
        licenseNo: "",
        licenseCategory: "",
        expiryDate: "",
        phone: "",
        safetyScore: "",
        status: "Available"
    });

    useEffect(() => {

        if (driver) {

            setForm(driver);

        }

    }, [driver]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/drivers/${driver._id}`, form);

            toast.success("Driver Updated Successfully");

            onSuccess();

            onClose();

        }
        catch (error) {

            toast.error(error.response?.data?.message || "Update Failed");

        }

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-2xl p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Edit Driver

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        name="licenseNo"
                        value={form.licenseNo}
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        name="licenseCategory"
                        value={form.licenseCategory}
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        type="date"
                        name="expiryDate"
                        value={form.expiryDate?.substring(0, 10)}
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <input
                        type="number"
                        name="safetyScore"
                        value={form.safetyScore}
                        onChange={handleChange}
                        className="border rounded-xl p-3 outline-none"
                    />

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="border rounded-xl p-3"
                    >

                        <option>Available</option>
                        <option>On Trip</option>
                        <option>Suspended</option>

                    </select>

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
                            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                        >

                            Update Driver

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditDriverModal;