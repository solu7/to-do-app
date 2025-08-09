import { useState } from "react";

export const useDashboardSidebar = () => {
  const [dashboardSidebarIsOpen, setDashboardSidebarIsOpen] = useState(false);

  const openDashboardSidebar = () => setDashboardSidebarIsOpen(true);
  const closeDashboardSidebar = () => setDashboardSidebarIsOpen(false);
  const toggleDashboardSidebar = () => setDashboardSidebarIsOpen(!dashboardSidebarIsOpen);

  return {
    dashboardSidebarIsOpen,
    openDashboardSidebar,
    closeDashboardSidebar,
    toggleDashboardSidebar,
  };
};