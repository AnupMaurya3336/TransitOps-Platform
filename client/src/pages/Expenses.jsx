import { useEffect, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import api from "../services/api";
import AddExpenseModal from "../components/expense/AddExpenseModal";
import { deleteExpense } from "../services/expenseService";


function Expenses(){

    const [expenses,setExpenses]=useState([]);

    const [search,setSearch]=useState("");

    const [openModal,setOpenModal]=useState(false);



    useEffect(()=>{

        loadExpenses();

    },[]);



    const loadExpenses=async()=>{

        try{

            const res=await api.get("/expense");

            setExpenses(res.data.expenses || []);

        }
        catch(error){

            console.log(error);

        }

    };



    const handleDelete=async(id)=>{
        if(!window.confirm("Delete this expense?")) return;
        try{
            await deleteExpense(id);
            toast.success("Expense Deleted");
            loadExpenses();
        }
        catch(error){
            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );
        }
    };



    const filteredExpenses=expenses.filter(item=>

        item.vehicle?.vehicleName
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );



    return(

        <div>


            <div className="flex justify-between items-center mb-6">


                <div>

                    <h1 className="text-3xl font-bold">

                        Expense Management

                    </h1>


                    <p className="text-gray-500">

                        Manage Vehicle Expenses

                    </p>


                </div>



                <button

                onClick={()=>setOpenModal(true)}

                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"

                >

                    <Plus size={18}/>

                    Add Expense

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

                    onChange={(e)=>setSearch(e.target.value)}

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
                                Type
                            </th>


                            <th>
                                Amount
                            </th>


                            <th>
                                Description
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

                    filteredExpenses.length>0?

                    filteredExpenses.map(item=>(


                        <tr

                        key={item._id}

                        className="border-b hover:bg-gray-50"

                        >


                            <td className="py-4">

                                {item.vehicle?.vehicleName}

                            </td>


                            <td>

                                {item.type}

                            </td>


                            <td>

                                ₹ {item.amount}

                            </td>


                            <td>

                                {item.description || "-"}

                            </td>


                            <td>

                                {new Date(item.createdAt).toLocaleDateString()}

                            </td>


                            <td>


                                <button

                                onClick={()=>handleDelete(item._id)}

                                className="text-red-600 hover:text-red-800"

                                >

                                    <Trash2 size={18}/>

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

                            No Expense Records

                        </td>

                    </tr>


                    }


                    </tbody>


                </table>


            </div>




            <AddExpenseModal

            open={openModal}

            onClose={()=>setOpenModal(false)}

            onSuccess={loadExpenses}

            />


        </div>

    );

}


export default Expenses;