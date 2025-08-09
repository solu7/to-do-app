import "./Dashboard.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDashboardSidebar } from "./components/Sidebar/hooks/useDashboardSidebar.js";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import TodayView from "../../features/tasks/views/Today/TodayView.jsx";
import EditPanel from "./components/EditPanel/EditPanel.jsx";
const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const {
    dashboardSidebarIsOpen,
    openDashboardSidebar,
    closeDashboardSidebar,
  } = useDashboardSidebar();

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
    openDashboardSidebar();
  }, []);
  return (
    <div className={`dashboard ${dashboardSidebarIsOpen ? "" : "w-sidebar"}`}>
      <Sidebar
        isOpen={dashboardSidebarIsOpen}
        onClose={closeDashboardSidebar}
        username={username}
        openDashboardSidebar={openDashboardSidebar}
      />
      <main className="dashboard-content">
        <Routes>
          <Route path="/" element={<TodayView />} />
        </Routes>
      </main>
      <EditPanel />
    </div>
  );
}

export default Dashboard;
