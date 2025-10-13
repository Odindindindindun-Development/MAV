import React from "react";
import Sidebar from "../components/Sidebar";
import UsersInfoTable from "../components/UsersInfoTable";

const UsersInfo: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <h1>Customer Information</h1>
        <p>Track, manage and forecast your customer orders.</p>
        <h2></h2>
        <UsersInfoTable />
      </main>
    </div>
  );
};

export default UsersInfo;
