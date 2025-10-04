import "./DashboardContent.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDashboardSidebar } from "../../components/Sidebar/hooks/useDashboardSidebar.js";
import Sidebar from "../Sidebar/Sidebar.jsx";
import TodayView from "../../../../features/tasks/views/Today/TodayView.jsx";
import EditPanel from "../EditPanel/EditPanel.jsx";
import { useTaskEditPanel } from "../Sidebar/hooks/useTaskEditPanel.js";
import { useTasks } from "../../../../context/TaskContext.jsx";
const API_URL = import.meta.env.VITE_API_URL;
function DashboardContent() {
  const {
    dashboardSidebarIsOpen,
    openDashboardSidebar,
    closeDashboardSidebar,
  } = useDashboardSidebar();
  const { taskEditPanelIsOpen, openTaskEditPanel, closeTaskEditPanel } =
    useTaskEditPanel();
  const [username, setUsername] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { getTaskById } = useTasks();
  const selectedTask = selectedTaskId ? getTaskById(selectedTaskId) : null;
  const handleTaskSelection = (task) => {
    setSelectedTaskId(task);
    openTaskEditPanel();
  };
  const handleOpenEditPanel = () => {
    if (selectedTaskId) {
      openTaskEditPanel();
    } else {
      closeTaskEditPanel();
    }
  };
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
    <div className="dashboard">
      <Sidebar
        isOpen={dashboardSidebarIsOpen}
        onClose={closeDashboardSidebar}
        username={username}
        openDashboardSidebar={openDashboardSidebar}
      />
      <Routes>
        <Route
          path="/"
          element={<TodayView onTaskClick={handleTaskSelection} />}
        />
      </Routes>
      <EditPanel
        isOpen={taskEditPanelIsOpen}
        onClose={closeTaskEditPanel}
        handleOpenEditPanel={handleOpenEditPanel}
        task={selectedTask}
      />
    </div>
  );
}

export default DashboardContent;
