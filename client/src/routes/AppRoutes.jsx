import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Vehicles from "../pages/Vehicles";

import MainLayout from "../layouts/MainLayout";
import Drivers from "../pages/Drivers";
import Expenses from "../pages/Expenses";
import Fuel from "../pages/Fuel";
import Maintenance from "../pages/Maintenance";
import Trips from "../pages/Trips";
import ProtectedRoute from "./ProtectedRoute";
import Reports from "../pages/Reports";

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
            <Route
                path="/maintenance"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Maintenance />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/fuel"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Fuel />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/expenses"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Expenses />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reports"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Reports />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default AppRoutes;