import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/HomePage.jsx";
import RegisterPage from "./features/auth/Register/Register.jsx";
import LoginPage from "./features/auth/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
