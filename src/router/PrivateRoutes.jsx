import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/layouts/DashboardLayout";

const PrivateRoutes = () => {
  const { currentUser } = useAuth();
  return (
    <DashboardLayout>
      <div style={{ marginTop: "71px" }}>
        {!currentUser ? <Navigate to="/login" /> : <Outlet />}
      </div>
    </DashboardLayout>
  );
};

export default PrivateRoutes;
