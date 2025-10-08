import { useState } from "react";
import { useTasks } from "../../../context/TaskContext.jsx";
import { useTaskData } from "../../tasks/services/useTaskData.js";
import {
  getTaskPriority,
  setTaskPriority,
} from "../services/prioritiesServices.js";
import { TaskPrioritiesList } from "../data/TaskPrioritiesList.js";

/**
 * Hook para gestionar la prioridad de una tarea.
 * Puede ser usado para obtener la prioridad de una tarea existente (pasando la tarea)
 * o para gestionar la selección de una nueva prioridad (sin pasar la tarea).
 * @param {object} task - El objeto de la tarea (opcional).
 * @returns {object} Un objeto con datos y funciones relacionadas con la prioridad.
 */
export const useTaskPriority = (task) => {
  const { fetchInboxTasks } = useTasks();
  const [selectedPriority, setSelectedPriority] = useState(null);

  const { data: rawTaskPriority } = useTaskData(task, getTaskPriority);

  const priority =
    rawTaskPriority[task?.id]?.priority ?? selectedPriority?.value ?? 0;

  const formattedPriorityText = priority
    ? `Prioridad ${priority}`
    : "Sin prioridad";

  const priorityData = TaskPrioritiesList.find((p) => p.value === priority);
  const priorityIcon = priorityData ? priorityData.icon : null;

  const handleSetPriority = (item) => {
    setSelectedPriority(item);
  };

  const handleSavePriority = async (taskId, priorityValue) => {
    try {
      await setTaskPriority(taskId, priorityValue);
      fetchInboxTasks();
    } catch (error) {
      console.error("Error al guardar la prioridad:", error);
    }
  };

  return {
    formattedPriorityText,
    priorityIcon,
    selectedPriority,
    handleSetPriority,
    handleSavePriority,
  };
};
