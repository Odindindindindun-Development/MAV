import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersInfo from "./pages/UsersInfo";
import UserTransaction from "./pages/UserTransaction";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import InventorySystem from "./pages/InventorySystem";
import AddInventory from "./pages/AddInventory";
import InventoryArchive from "./pages/InventoryArchive";
import "./style/style.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users/customer-info" element={<UsersInfo />} />
        <Route path="/users/customer-transactions" element={<UserTransaction />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/inventory" element={<InventorySystem />} />
        <Route path="/inventory/add" element={<AddInventory />} />
        <Route path="/inventory/archive" element={<InventoryArchive />} />
        

      </Routes>
    </Router>

  );
};

export default App;
