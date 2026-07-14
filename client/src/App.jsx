import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";

function App() {

    return (

        <BrowserRouter>

            <AppRoutes />

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 2000,
                    style: {
                        borderRadius: "12px",
                        background: "#ffffff",
                        color: "#111827"
                    }
                }}
            />

        </BrowserRouter>

    );

}

export default App;