import "./Dashboard.css";
import Sidebar from "./components/Sidebar";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <h1>Seccion a mostrar</h1>
      <div>
        <h1>Filtros  y features</h1>
      </div>
    </div>
  );
}

export default Dashboard;
