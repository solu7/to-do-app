import { useState, useEffect, useMemo } from "react";
import { useTaskData } from "../services/useTaskData";
import { useGetTaskDueDate, useSetTaskDueDate } from "./taskDueDateServices";

import { formatEditPanelHeader } from "../utils/taskDateFormatter";

export const useTaskDueDate = (task) => {
  const { data: taskDueDateString, refetch: refetchTaskDate } = useTaskData(
    task,
    useGetTaskDueDate
  );

  const [selectedDueDate, setSelectedDueDate] = useState(null);

  useEffect(() => {
    const taskId = task?.id;
    let dateValue = null;

    if (
      taskId &&
      typeof taskDueDateString === "object" &&
      taskDueDateString !== null
    ) {
      dateValue = taskDueDateString[taskId];
    }

    if (dateValue && typeof dateValue === "string") {
      const dateObject = new Date(dateValue);

      if (!isNaN(dateObject.getTime())) {
        setSelectedDueDate(dateObject);
      } else {
        setSelectedDueDate(null);
      }
    } else {
      setSelectedDueDate(null);
    }
  }, [task, taskDueDateString]);

  const handleSaveDueDate = async (taskId, date) => {
    if (!taskId) {
      console.error("No se puede guardar la fecha sin un ID de tarea.");
      return;
    }
    try {
      const formattedDate = date ? date.toISOString() : null;
      await useSetTaskDueDate({ taskId, date: formattedDate });
    } catch (error) {
      console.error("Error al guardar la fecha:", error);
    }
  };

  const handleDueDateChange = async (date) => {
    setSelectedDueDate(date);

    if (task && task.id) {
      await handleSaveDueDate(task.id, date);
    }
    await refetchTaskDate();
  };

  const formattedDateText = useMemo(() => {
    return formatEditPanelHeader(selectedDueDate);
  }, [selectedDueDate]);

  return {
    selectedDueDate,
    handleDueDateChange,
    formattedDateText,
    handleSaveDueDate,
    refetchTaskDate,
  };
};
