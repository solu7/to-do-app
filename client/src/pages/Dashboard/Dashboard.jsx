import { TaskProvider } from "../../context/TaskContext";
import DashboardContent from "./components/DashboardContent/DashboardContent";

function Dashboard() {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
}

export default Dashboard;
