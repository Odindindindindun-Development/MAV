import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div>
        <h2>Customer Information</h2>
        <p>Track, manage, and forecast your customers and orders.</p>
      </div>
      <button className="add-btn">+ Add</button>
    </header>
  );
};

export default Header;
