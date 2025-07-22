import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/Home/HomePage.jsx";
import RegisterPage from "./pages/Register/Register.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
