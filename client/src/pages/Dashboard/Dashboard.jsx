import { TaskProvider } from "../../context/TaskContext";
import { UserProvider } from "../../context/UserContext";
import DashboardContent from "./components/DashboardContent/DashboardContent";

function Dashboard() {
  return (
    <TaskProvider>
      <UserProvider>
        <DashboardContent />
      </UserProvider>
    </TaskProvider>
  );
}

export default Dashboard;
