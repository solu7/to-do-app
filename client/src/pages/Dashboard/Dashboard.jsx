import "./Dashboard.css";

import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import TodayView from "../../features/tasks/views/Today/TodayView.jsx";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
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
