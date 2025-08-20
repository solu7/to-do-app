import "./Dashboard.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDashboardSidebar } from "./components/Sidebar/hooks/useDashboardSidebar.js";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import TodayView from "../../features/tasks/views/Today/TodayView.jsx";
import EditPanel from "./components/EditPanel/EditPanel.jsx";
import { useTaskEditPanel } from "./components/Sidebar/hooks/useTaskEditPanel.js";
const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const {
    dashboardSidebarIsOpen,
    openDashboardSidebar,
    closeDashboardSidebar,
  } = useDashboardSidebar();

  const { taskEditPanelIsOpen, openTaskEditPanel, closeTaskEditPanel } =
    useTaskEditPanel();

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
    openTaskEditPanel();
  }, []);
  return (
    <div className="dashboard">
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
      <EditPanel
        isOpen={taskEditPanelIsOpen}
        onClose={closeTaskEditPanel}
        openTaskEditPanel={openTaskEditPanel}
      />
    </div>
  );
}

export default Dashboard;
