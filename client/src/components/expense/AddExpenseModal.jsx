import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";


function AddExpenseModal({open,onClose,onSuccess}){


    const [vehicles,setVehicles]=useState([]);


    const [form,setForm]=useState({

        vehicle:"",
        type:"",
        amount:"",
        description:""

    });



    useEffect(()=>{

        if(open){

            loadVehicles();

        }

    },[open]);



    const loadVehicles=async()=>{

        try{

            const res=await api.get("/vehicles");

            setVehicles(res.data.vehicles || []);

        }
        catch(error){

            console.log(error);

            toast.error("Unable to load vehicles");

        }

    };



    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };



    const handleSubmit=async(e)=>{

        e.preventDefault();


        try{


            await api.post("/expense",form);


            toast.success("Expense Added Successfully");


            setForm({

                vehicle:"",
                type:"",
                amount:"",
                description:""

            });


            onSuccess();

            onClose();


        }
        catch(error){


            toast.error(

                error.response?.data?.message ||
                "Something Went Wrong"

            );


        }


    };



    if(!open) return null;



    return(


        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


            <div className="bg-white rounded-2xl w-full max-w-xl p-8">


                <h2 className="text-3xl font-bold mb-6">

                    Add Expense

                </h2>



                <form

                onSubmit={handleSubmit}

                className="space-y-4"

                >



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

                        vehicles.map(vehicle=>(


                            <option

                            key={vehicle._id}

                            value={vehicle._id}

                            >

                                {vehicle.registrationNumber} - {vehicle.vehicleName}

                            </option>


                        ))

                        }


                    </select>




                    <select

                    name="type"

                    value={form.type}

                    onChange={handleChange}

                    className="w-full border rounded-xl p-3"

                    >


                        <option value="">

                            Select Expense Type

                        </option>


                        <option value="Toll">

                            Toll

                        </option>


                        <option value="Maintenance">

                            Maintenance

                        </option>


                        <option value="Insurance">

                            Insurance

                        </option>


                        <option value="Parking">

                            Parking

                        </option>


                        <option value="Fine">

                            Fine

                        </option>


                        <option value="Other">

                            Other

                        </option>


                    </select>




                    <input

                    type="number"

                    name="amount"

                    value={form.amount}

                    placeholder="Expense Amount"

                    onChange={handleChange}

                    className="w-full border rounded-xl p-3"

                    />




                    <textarea

                    name="description"

                    value={form.description}

                    placeholder="Description"

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

                        className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"

                        >

                            Save Expense

                        </button>


                    </div>



                </form>


            </div>


        </div>


    );


}


export default AddExpenseModal;