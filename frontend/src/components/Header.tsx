import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div>
        <h2>Customer Information</h2>
        <p>Track, manage, and forecast your customers and orders.</p>
      </div>
      <Link to={`/users/add`}>
                <button className="add-btn">Add</button>
              </Link>
      
    </header>
  );
};

export default Header;
