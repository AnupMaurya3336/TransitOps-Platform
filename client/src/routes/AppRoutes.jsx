import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import MainLayout from "../layouts/MainLayout";


function AppRoutes(){

    return(

        <Routes>


            <Route
                path="/"
                element={<Login />}
            />


            <Route

                path="/dashboard"

                element={

                    <MainLayout>

                        <Dashboard />

                    </MainLayout>

                }

            />


        </Routes>

    );

}


export default AppRoutes;