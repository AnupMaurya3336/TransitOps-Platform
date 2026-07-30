function DeleteModal({open,onClose,onConfirm}){


    if(!open) return null;


    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Confirm Delete
                </h2>
                <p className="text-gray-500 mb-6">
                    Are you sure you want to delete this record?
                </p>
                <div className="flex justify-end gap-3">
                    <button
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                    onClick={onConfirm}
                    className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}


export default DeleteModal;