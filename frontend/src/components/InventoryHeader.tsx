import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaBell } from "react-icons/fa";

interface LowStockItem {
  StockItemID: number;
  ItemName: string;
  QuantityOnHand: number;
  ReorderLevel: number;
}

const InventoryHeader: React.FC = () => {
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch low stock items
  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/StockItem/low");
        const data = await res.json();
        setLowStockItems(data);
      } catch (error) {
        console.error("Error fetching low stock:", error);
      }
    };

    fetchLowStock();

    // Optional: auto-refresh every 1 minute
    const interval = setInterval(fetchLowStock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div>
        <h2>Inventory</h2>
        <p>Monitor, update, and control your stock levels</p>
      </div>

      <div className="header-buttons">
        {/* Notification Button */}
        <div className="notification-wrapper">
          <button
            className="add-btn notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell /> Notifications{" "}
            {lowStockItems.length > 0 && (
              <span className="notif-badge">{lowStockItems.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-popup">
              <div className="notification-header">Low Stock Alerts</div>
              {lowStockItems.length > 0 ? (
                <ul className="notification-list">
                  {lowStockItems.map((item) => (
                    <li key={item.StockItemID} className="notification-item">
                      <strong>{item.ItemName}</strong> <br />
                      Quantity:{" "}
                      <span className="low-qty">{item.QuantityOnHand}</span> /{" "}
                      Reorder Level: {item.ReorderLevel}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="notification-empty">
                  ✅ All items are sufficiently stocked.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Item Button */}
        <Link to="/inventory/add">
          <button className="add-btn">
            <FaPlus /> Add
          </button>
        </Link>
      </div>
    </header>
  );
};

export default InventoryHeader;
