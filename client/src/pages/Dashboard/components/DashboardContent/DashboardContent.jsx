import "./DashboardContent.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../styles/utility.css";
import "../../../../styles/modals.css";
import "../../../../features/tasks/styles/TaskViewLayout.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDashboardSidebar } from "../../components/Sidebar/hooks/useDashboardSidebar.js";
import Sidebar from "../Sidebar/Sidebar.jsx";
import InboxView from "../../../../features/tasks/views/Inbox/InboxView.jsx";
import TodayView from "../../../../features/tasks/views/Today/TodayView.jsx";
import UpcomingView from "../../../../features/tasks/views/Upcoming/Upcoming.jsx";
import CompletedView from "../../../../features/tasks/views/Completed/CompletedView.jsx";
import FiltersView from "../../../../features/tasks/views/Filters/FiltersView.jsx";
import FilteredTasksView from "../../../../features/tasks/views/Filtered/FilteredTasksView.jsx";
import EditPanel from "../EditPanel/EditPanel.jsx";
import { useTaskEditPanel } from "../Sidebar/hooks/useTaskEditPanel.js";
import { useTasks } from "../../../../context/TaskContext.jsx";
import { useUser } from "../../../../context/UserContext.jsx";

function DashboardContent() {
  const { userData } = useUser();
  const {
    dashboardSidebarIsOpen,
    openDashboardSidebar,
    closeDashboardSidebar,
  } = useDashboardSidebar();
  const { taskEditPanelIsOpen, openTaskEditPanel, closeTaskEditPanel } =
    useTaskEditPanel();
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
  useEffect(() => {
    openDashboardSidebar();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={dashboardSidebarIsOpen}
        onClose={closeDashboardSidebar}
        username={userData?.username || "Invitado"}
        openDashboardSidebar={openDashboardSidebar}
      />
      <div className="dashboard__view">
        <Routes>
          <Route
            path="/"
            element={<InboxView onTaskClick={handleTaskSelection} />}
          />
          <Route
            path="/today"
            element={<TodayView onTaskClick={handleTaskSelection} />}
          />
          <Route
            path="/upcoming"
            element={<UpcomingView onTaskClick={handleTaskSelection} />}
          />
          <Route
            path="/completed"
            element={<CompletedView onTaskClick={handleTaskSelection} />}
          />
          <Route path="/filters" element={<FiltersView />} />
          <Route
            path="/filtered-tasks"
            element={<FilteredTasksView onTaskClick={handleTaskSelection} />}
          />
        </Routes>
      </div>
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
