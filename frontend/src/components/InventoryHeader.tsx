import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaBell } from "react-icons/fa";

const InventoryHeader: React.FC = () => {
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/StockItem/low");
        const data = await res.json();
        setLowStockCount(data.length);
      } catch (error) {
        console.error("Error fetching low stock:", error);
      }
    };

    fetchLowStock();
  }, []);

  return (
    <header className="header">
      <div>
        <h2>Inventory</h2>
        <p>Monitor, update, and control your stock levels</p>
      </div>
      <div className="header-buttons">
        <button className="add-btn">
          <FaBell />
          Notification {lowStockCount > 0 && <span>({lowStockCount})</span>}
        </button>
        <Link to={`/inventory/add`}>
          <button className="add-btn">
            <FaPlus /> Add
          </button>
        </Link>
      </div>
    </header>
  );
};

export default InventoryHeader;
