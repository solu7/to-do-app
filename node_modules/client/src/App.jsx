import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/Home/HomePage.jsx";
import RegisterPage from "./features/Register/Register.jsx";
import LoginPage from "./features/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboardTest" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
