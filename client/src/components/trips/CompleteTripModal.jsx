import { useState } from "react";
import toast from "react-hot-toast";
import { completeTrip } from "../../services/tripService";

function CompleteTripModal({ open, onClose, tripId, onSuccess }) {

    const [form, setForm] = useState({
        actualDistance: "",
        fuelConsumed: "",
        finalOdometer: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await completeTrip(tripId, form);

            toast.success("Trip Completed Successfully");

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

            <div className="bg-white rounded-2xl w-full max-w-xl p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Complete Trip

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="number"
                        name="actualDistance"
                        placeholder="Actual Distance (KM)"
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        type="number"
                        name="fuelConsumed"
                        placeholder="Fuel Consumed (L)"
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        type="number"
                        name="finalOdometer"
                        placeholder="Current Vehicle KM"
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
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
                            className="px-5 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700"
                        >

                            Complete Trip

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CompleteTripModal;