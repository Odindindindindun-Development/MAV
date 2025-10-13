import React from "react";
import Sidebar from "../components/Sidebar";
import InventoryHeader from "../components/InventoryHeader";
import InventoryTable from "../components/InventoryTable";

const InventorySystem: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <InventoryHeader />
        <InventoryTable />
      </main>
    </div>
  );
};

export default InventorySystem;
