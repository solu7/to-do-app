import { useState, useEffect } from "react";
import { useTaskData } from "../../tasks/services/useTaskData";
import {
  useGetTaskDate,
  useSetTaskDate,
  formatDateForDisplay,
} from "../services/dateServices";

export const useTaskDate = (task) => {
  const { data: rawTaskDate, refetch: refetchTaskDate } = useTaskData(
    task,
    useGetTaskDate
  );

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (
      task &&
      rawTaskDate &&
      rawTaskDate[task.id] &&
      rawTaskDate[task.id].length > 0
    ) {
      const dateFromApi = rawTaskDate[task.id][0].date;
      setSelectedDate(new Date(dateFromApi));
    } else {
      setSelectedDate(null);
    }
  }, [task, rawTaskDate]);

  const handleSaveDate = async (taskId, date) => {
    if (!taskId) {
      console.error("No se puede guardar la fecha sin un ID de tarea.");
      return;
    }

    try {
      const formattedDate = date ? date.toISOString().split("T")[0] : null;

      await useSetTaskDate({ taskId, date: formattedDate });

      if (task) {
        refetchTaskDate();
      }

    } catch (error) {
      console.error("Error al guardar la fecha:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (task && task.id) {
      handleSaveDate(task.id, date);
    }
  };

  const formattedDateText = selectedDate
    ? formatDateForDisplay(selectedDate)
    : "Agrega una fecha!";

  return {
    selectedDate,
    handleDateChange,
    formattedDateText,
    handleSaveDate,
  };
};
