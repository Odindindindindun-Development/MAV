import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

const InventoryHeader: React.FC = () => {
  return (
    <header className="header">
      <div>
        <h2>Inventory</h2>
        <p>Monitor, update, and control your stock levels</p>
      </div>
      <div className="header-buttons">
        <button className="add-btn"> <FaBell />Notification</button>
      <Link to={`/inventory/add`}>
        <button className="add-btn"> <FaPlus />Add</button>
      </Link>
      </div>


    </header>
  );
};

export default InventoryHeader;
