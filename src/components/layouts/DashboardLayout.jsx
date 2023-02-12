import React from "react";
import DashNavbar from "../navbars/DashNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashNavbar />
      {children}
    </>
  );
};

export default DashboardLayout;
