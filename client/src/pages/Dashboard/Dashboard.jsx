import "./Dashboard.css";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import TodayView from "../../features/tasks/views/Today/TodayView.jsx";
const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [username, setUsername] = useState("");
  const getLoggedUsername = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        setUsername("Invitado");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setUsername("Invitado");
    }
  };
  useEffect(() => {
    getLoggedUsername();
  }, []);
  return (
    <div className="dashboard">
      <Sidebar username={username} />
      <main className="dashboard-content">
        <Routes>
          <Route path="/" element={<TodayView />} />
        </Routes>
      </main>
      <div>
        <h1>Filtros y features</h1>
      </div>
    </div>
  );
}

export default Dashboard;
