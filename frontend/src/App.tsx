import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersInfo from "./pages/UsersInfo";
import UserTransaction from "./pages/UserTransaction";
import "./style/style.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users/customer-info" element={<UsersInfo />} />
        <Route path="/users/customer-transactions" element={<UserTransaction />} />
      </Routes>
    </Router>

  );
};

export default App;
