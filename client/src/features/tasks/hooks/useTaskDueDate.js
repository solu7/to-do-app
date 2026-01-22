import { useState, useEffect, useMemo } from "react";
import { useTaskData } from "../services/useTaskData";
import {
  getTaskDueDate,
  setTaskDueDate,
} from "../services/taskDueDateServices";

import {
  formatTaskCardDate,
  formatEditPanelHeader,
} from "../utils/taskDateFormatter";

export const useTaskDueDate = (task) => {
  const { data: taskDueDateString, refetch: refetchTaskDate } = useTaskData(
    task?.id ? task : null,
    getTaskDueDate,
  );

  const [selectedDueDate, setSelectedDueDate] = useState(null);

  const taskId = task?.id;
  const specificDateValue =
    taskDueDateString && taskId ? taskDueDateString[taskId] : null;

  useEffect(() => {
    if (!taskId) {
      if (selectedDueDate !== null) setSelectedDueDate(null);
      return;
    }
    if (specificDateValue === undefined) return;

    if (specificDateValue && typeof specificDateValue === "string") {
      const dateObject = new Date(specificDateValue);
      const currentTime = selectedDueDate?.getTime();
      const newTime = dateObject.getTime();

      if (!isNaN(newTime) && currentTime !== newTime) {
        setSelectedDueDate(dateObject);
      }
    } else {
      if (selectedDueDate !== null) {
        setSelectedDueDate(null);
      }
    }
  }, [taskId, specificDateValue]);

  const handleSaveDueDate = async (taskId, date) => {
    if (!taskId) {
      console.error("No se puede guardar la fecha sin un ID de tarea.");
      return;
    }
    try {
      const formattedDate = date ? date.toISOString() : null;
      await setTaskDueDate({ taskId, date: formattedDate });
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

  const formattedDateModalText = useMemo(() => {
    if (!selectedDueDate) return "Agrega una fecha!";
    return formatTaskCardDate(selectedDueDate);
  }, [selectedDueDate]);

  return {
    selectedDueDate,
    handleDueDateChange,
    formattedDateText,
    formattedDateModalText,
    handleSaveDueDate,
    refetchTaskDate,
  };
};
