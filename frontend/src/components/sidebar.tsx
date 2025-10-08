import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
   const [open, setOpen] = useState(false);

  return (
    <aside className="sidebar">
        <div>
      <div className="logo">Logo</div>

        <nav className="menu">
        {/* USERS DROPDOWN */}
        <div>
          <div className="menu-item" onClick={() => setOpen(!open)}>
            <span>Users</span>
            <span>{open ? "▲" : "▼"}</span>
          </div>

          {open && (
            <div className="submenu">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "submenu-item-active" : "submenu-item"
                }
              >
                Customer Info
              </NavLink>

              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "submenu-item-active" : "submenu-item"
                }
              >
                Transactions
              </NavLink>
            </div>
          )}
        </div>

        {/* OTHER LINKS */}
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Inventory
        </NavLink>

        <NavLink
          to="/billing"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Billing
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Settings
        </NavLink>
      </nav>
      </div>

      <div className="sidebar-footer">
        <div className="settings">⚙️</div>
        <div className="profile">Profile</div>
      </div>
    </aside>
  );
};

export default Sidebar;
