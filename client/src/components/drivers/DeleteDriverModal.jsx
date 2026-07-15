import api from "../../services/api";
import toast from "react-hot-toast";

function DeleteDriverModal({open,onClose,driverId,onSuccess}){

    if(!open) return null;

    const handleDelete=async()=>{

        try{

            await api.delete(`/drivers/${driverId}`);

            toast.success("Driver Deleted Successfully");

            onSuccess();

            onClose();

        }
        catch(error){

            toast.error(error.response?.data?.message||"Delete Failed");

        }

    };

    return(

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-md p-8">

                <h2 className="text-2xl font-bold mb-3">

                    Delete Driver

                </h2>

                <p className="text-gray-500 mb-6">

                    Are you sure you want to delete this driver?

                </p>

                <div className="flex justify-end gap-3">

                    <button
                    onClick={onClose}
                    className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
                    >

                        Cancel

                    </button>

                    <button
                    onClick={handleDelete}
                    className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteDriverModal;