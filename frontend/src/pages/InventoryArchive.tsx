import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const InventoryArchive: React.FC = () => {

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <h2>Inventory Archive</h2>
        <p>
          History of stock levels and item statuses.
        </p>

        
      </main>
    </div>
  );
};

export default InventoryArchive;
