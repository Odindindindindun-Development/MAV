import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

const InventoryHeader: React.FC = () => {
  return (
    <header className="header">
      <div>
        <h2>Customer Information</h2>
        <p>Track, manage, and forecast your customers and orders.</p>
      </div>
      <Link to={`/users/add`}>
        <button className="add-btn"> <FaBell />Notification</button>
        <button className="add-btn"> <FaPlus />Add</button>
      </Link>

    </header>
  );
};

export default InventoryHeader;
