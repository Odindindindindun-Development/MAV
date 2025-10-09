import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";

const UserTransaction: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <Header />
        <p>niger</p>
      </main>
    </div>
  );
};

export default UserTransaction;
