import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import UsersInfoTable from "../components/UsersInfoTable";

const UsersInfo: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <Header />
        <UsersInfoTable />
      </main>
    </div>
  );
};

export default UsersInfo;
