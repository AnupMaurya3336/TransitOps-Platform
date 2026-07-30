import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({children}){
    return(
        <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-72 min-h-screen">
                <div className="p-6">
                    <Navbar />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default MainLayout;