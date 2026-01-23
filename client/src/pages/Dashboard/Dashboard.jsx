import { TaskProvider } from "../../context/TaskContext";
import { FilterProvider } from "../../context/FilterContext";
import DashboardContent from "./components/DashboardContent/DashboardContent";

function Dashboard() {
  return (
    <TaskProvider>
        <FilterProvider>
          <DashboardContent />
        </FilterProvider>
    </TaskProvider>
  );
}

export default Dashboard;
