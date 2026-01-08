import { TaskProvider } from "../../context/TaskContext";
import { UserProvider } from "../../context/UserContext";
import { FilterProvider } from "../../context/FilterContext";
import DashboardContent from "./components/DashboardContent/DashboardContent";

function Dashboard() {
  return (
    <TaskProvider>
      <UserProvider>
        <FilterProvider>
          <DashboardContent />
        </FilterProvider>
      </UserProvider>
    </TaskProvider>
  );
}

export default Dashboard;
