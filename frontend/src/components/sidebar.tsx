import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Sidebar: React.FC = () => {
    const location = useLocation();
  const [open, setOpen] = useState(false);

  // Determine if any /users/... route is active
  const isUsersActive = location.pathname.startsWith("/user");

  // Automatically open Users dropdown if any submenu is active
  useEffect(() => {
    if (isUsersActive) setOpen(true);
  }, [isUsersActive]);

  return (
    <aside className="sidebar">
        <div>
      <div className="logo">Logo</div>

        <nav className="menu">
        {/* USERS DROPDOWN */}
        <div>
          <div  className={`menu-item-split menu-item ${isUsersActive ? "submenu-parent-active" : ""}`}
          onClick={() => setOpen(!open)}>
            <span>Users</span>
            <span className="center-icon-align">{open ? <FaChevronUp /> : <FaChevronDown />}</span>
          </div>

          {open && (
            <div className="submenu">
              <NavLink
                to="/users/customer-info"
                className={({ isActive }) =>
                  isActive ? "submenu-item-active" : "submenu-item"
                }
              >
                Customer Info
              </NavLink>

              <NavLink
                to="/users/customer-transactions"
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
          to="/Inventory"
          className={({ isActive }) =>
            isActive ? "menu-item-active" : "menu-item"
          }
        >
          Inventory
        </NavLink>

        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Financial Records
        </NavLink>

        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Billings
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
