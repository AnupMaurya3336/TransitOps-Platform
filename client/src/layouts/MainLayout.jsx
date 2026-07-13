import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({children}){

    return(
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-6">

                <Navbar />

                {children}

            </div>

        </div>
    );
}

export default MainLayout;