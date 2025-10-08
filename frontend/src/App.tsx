import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersInfo from "./pages/UsersInfo";
import "./style/style.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersInfo />} />
      </Routes>
    </Router>

  );
};

export default App;
