import { useState } from "react";

export const useTaskEditPanel = () => {
  const [taskEditPanelIsOpen, setTaskEditPanelIsOpen] = useState(false);

  const openTaskEditPanel = () => setTaskEditPanelIsOpen(true);
  const closeTaskEditPanel = () => setTaskEditPanelIsOpen(false);
  const toggleTaskEditPanel = () => setTaskEditPanelIsOpen(!taskEditPanelIsOpen);

  return {
    taskEditPanelIsOpen,
    openTaskEditPanel,
    closeTaskEditPanel,
    toggleTaskEditPanel,
  };
};