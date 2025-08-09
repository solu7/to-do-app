import { useState } from "react";

export const useAddTaskModal = () => {
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false);

  const openAddTaskModal = () => setAddTaskModalIsOpen(true);
  const closeAddTaskModal = () => setAddTaskModalIsOpen(false);
  const toggleAddTaskModal = () => setAddTaskModalIsOpen(!addTaskModalIsOpen);

  return { addTaskModalIsOpen, openAddTaskModal, closeAddTaskModal, toggleAddTaskModal };
};