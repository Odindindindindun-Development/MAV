import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="logo">Logo</div>

      <nav className="menu">
        <ul>
          {/* USERS DROPDOWN */}
          <li
            className="menu-item"
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            style={{ cursor: "pointer" }}
          >
            <span>👥 Users</span>
          </li>

          {isUsersOpen && (
            <ul className="submenu">
              <li>Customer Info</li>
              <li>Transactions</li>
            </ul>
          )}

          {/* OTHER MENU ITEMS */}
          <li>Inventory System</li>
          <li>Financial Records</li>
          <li>Billings</li>
          <li>What a Sigma</li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="settings">⚙️</div>
        <div className="profile">Profile</div>
      </div>
    </aside>
  );
};

export default Sidebar;
