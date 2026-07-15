import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Vehicles from "../pages/Vehicles";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Drivers from "../pages/Drivers";
import Trips from "../pages/Trips";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/vehicles"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Vehicles />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/drivers"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Drivers />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/trips"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Trips />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default AppRoutes;